const { promisify } = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/email');

//# SIGNING JWT TOKEN
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

//# SEND RESPONSE TOKEN AND LOG USER IN
const sendToken = (user, res, statusCode) => {
  const token = signToken(user._id);

  user.password = undefined;
  user.__v = undefined;

  // -> STORING TOKEN IN A COOKIE IN BROWSER

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};

//# SIGN UP ######################
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, passwordChangedAt } =
    req.body;

  const url = `${req.protocol}://${req.get('host')}/me`;
  // console.log(url);

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    passwordChangedAt,
  });

  await new Email(newUser, url).sendWelcome();

  sendToken(newUser, res, 201);
});

//# LOGIN ######################
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email id and password are entered
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2) Check if user exists
  const user = await User.findOne({ email }).select(
    '+password +loginAttempts +isBlocked +timeToUnblock'
  );

  // 3) Check if user is blocked from logging in
  if (user) {
    const timeToUnBlock = await user.isLoginBlocked();
    if (user.isBlocked)
      return next(
        new AppError(
          `Too many incorrect login attempts. Please wait ${~~(
            timeToUnBlock / 60000
          )}:${~~((timeToUnBlock % 60000) / 1000)} minutes before trying again`,
          400
        )
      );
  }

  // 3  Check if password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    if (user) {
      await user.loginSuccess(false);
    }
    return next(new AppError('Incorrect email or password', 401));
  }
  await user.loginSuccess(true);

  // console.log(user);
  sendToken(user, res, 200);
});

// # PROTECT ######################
exports.protect = catchAsync(async (req, res, next) => {
  // console.log(req.headers);
  let token;
  // 1) Fetch the token
  if (req.headers?.authorization?.startsWith('Bearer'))
    token = req.headers.authorization.split(' ')[1];
  else if (req.cookies.jwt) token = req.cookies.jwt;

  if (!token)
    return next(
      new AppError(
        `You are not logged in. Please log in to perform this action`,
        401
      )
    );

  // 2) Verify if token is valid
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) return next(new AppError(`User no longer exists`, 401));

  // 4) Check if user changed password after the token was issued
  if (currentUser.passwordChangeVerification(decoded.iat))
    return next(
      new AppError(
        `Password has been changed recently. Please log in again to continue!`,
        401
      )
    );

  // 5) Verify
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

// # CHECK IF LOGGED IN FOR RENDERING HEADER ACCORDINGLY ######################
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  // Check if cookie is present
  if (!req.cookies.jwt) return next();

  // 1) Verify if token is valid
  const token = req.cookies.jwt;
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 2) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) return next();

  // 3) Check if user changed password after the token was issued
  if (currentUser.passwordChangeVerification(decoded.iat)) return next();

  // 5) There is a logged in User
  //-> Pug template will have access to the locals object
  res.locals.user = currentUser;
  next();
});

// # LOG USER OUT ######################
exports.logout = (req, res) => {
  res.cookie('jwt', 'null', {
    expires: new Date(Date.now() - 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
};

// # RESTRICT TO ######################
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError(`You do not have permissions to perform this action`, 403)
      );

    next();
  };
};

// # FORGOT PASSWORD ######################
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new AppError(`There is no user with this email id!`, 404));

  // 2) Generate the random reset token
  const resetToken = user.generatePasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    // 3) Send it to users email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Click on the link below to reset your password \n${resetURL} \nIf you didn't requested for a password change, please ignore this email!`;

    await new Email(user, resetURL).sendPasswordReset();

    // 4) Response
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    req.passwordResetToken = undefined;
    req.passwordResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        `There was an error sending the email. Please try again after sometime.`,
        500
      )
    );
  }
});

//# RESET PASSWORD ######################
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  // 2) Set new password if token has not expired and user exists
  // 3) Update changedPasswordAt property for the user
  if (!user) return next(new AppError(`Token is invalid or has expired`, 400));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;

  await user.save();

  // 4) Log the user in, send JWT
  sendToken(user, res, 200);
});

// # UPDATE PASSWORD ######################
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user._id).select('+password');

  // 2) Check if posted password is correct
  const { currentPassword } = req.body;
  if (!(await user.correctPassword(currentPassword, user.password)))
    return next(new AppError(`Your current password is incorrect!`, 401));

  // 3) If so update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();

  // 4) Log user in, send JWT
  sendToken(user, res, 200);
});
