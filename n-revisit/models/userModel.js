const { randomBytes, createHash } = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `Please enter your name!`],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email!'],
      lowercase: true,
      unique: true,
      validate: [
        validator.isEmail,
        'Incorrect email id. Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minLength: [8, 'Password must be at-least 8 characters long'],
      maxLength: [16, 'Password should  not be more than 16 characters'],
      select: false,
    },
    passwordChangedAt: Date,
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (val) {
          return this.password === val;
        },
        message: 'Password do not match',
      },
    },
    passwordResetToken: { type: String, select: false },
    passwordResetTokenExpires: { type: Date, select: false },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'guide', 'lead-guide', 'admin'],
      },
      lowercase: true,
      message:
        '{VALUE} is not supported. Accepted Values - user, guide, lead-guide, admin',
      default: 'user',
    },
    loginAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
      select: false,
    },
    timeToUnblock: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// # Encrypt Password
userSchema.pre('save', async function (next) {
  // console.log(this);
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

// # Check password validity
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// # Hide Inactive Users
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// # Decrypt password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// # Restrict Login on multiple failed Login Attempts
userSchema.methods.loginSuccess = async function (success) {
  if (!success) this.loginAttempts += 1;
  else this.loginAttempts = 0;

  if (this.loginAttempts >= process.env.MAX_LOGIN_ATTEMPTS) {
    this.isBlocked = true;
    this.timeToUnblock = Date.now() + 60 * 60 * 1000;
  }

  await this.save({ validateBeforeSave: false });
};

/// # Check if user is allowed to login
userSchema.methods.isLoginBlocked = async function () {
  if (!this.isBlocked) return;
  const unblockTime = this.timeToUnblock - Date.now();

  if (unblockTime > 0) return unblockTime;

  this.isBlocked = false;
  this.loginAttempts = 0;
  this.timeToUnblock = undefined;
  await this.save({ validateBeforeSave: false });

  return unblockTime;
};

// # Verify password
userSchema.methods.passwordChangeVerification = function (JWTTimestamp) {
  if (!this.passwordChangedAt) return false;

  const changedTimeStamp = this.passwordChangedAt.getTime() / 1000;
  return changedTimeStamp > JWTTimestamp;
};

// # Forgot Password? Generate reset token
userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = randomBytes(32).toString('hex');
  this.passwordResetToken = createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetTokenExpires = Date.now() + 1000 * 600;

  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
