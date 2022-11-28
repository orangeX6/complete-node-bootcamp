const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObject = (obj, ...fields) => {
  console.log(fields);
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (fields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

// # GET ALL USERS
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

// # UPDATE YOUR ACCOUNT
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        `This route is not for password updates. Please use /updatePassword`,
        400
      )
    );

  const fields = ['name', 'email'];
  const filteredBody = filterObject(req.body, ...fields);

  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    user: updatedUser,
  });
});

// # DELETE YOUR ACCOUNT
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: `This route is not yet defined`,
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: `This route is not yet defined`,
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: `This route is not yet defined`,
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: `This route is not yet defined`,
  });
};
