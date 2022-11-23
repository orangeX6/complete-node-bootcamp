const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
  },
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
  photo: String,
});

userSchema.pre('save', function (next) {
  // console.log(this);
  if (!this.isModified('password')) return next();

  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
