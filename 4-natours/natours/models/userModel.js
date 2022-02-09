const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    unique: true,
    validate: [
      validator.isEmail,
      'Incorrect email id. Please provide a valid email',
    ],
  },
  photo: String,
  password: {
    type: String,
    required: [true, ''],
    minLength: [8, 'A password must be at least 8 characters long'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //ONLY WORKS ON CREATE and SAVE and not on UPDATE
      validator: function (val) {
        return this.password === val;
      },
      message: 'Password do not match',
    },
  },
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete password confirm field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
