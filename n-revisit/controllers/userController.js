const fs = require('fs');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObject = (obj, ...fields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (fields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

// # DELETE EXISTING PHOTO BEFORE UPLOADING NEW
const deletePhotoFromServer = async (photo) => {
  const path = `${__dirname}/../public/img/users/${photo}`;
  await fs.unlink(path, (err) => {
    if (err) return console.log(err);
    console.log('Previous photo has been deleted');
  });
};

// # MULTER FILE CONFIG
// -> STORAGE
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const filename = `user-${req.user.id}-${Date.now()}`;
//     const extension = file.mimetype.split('/')[1];
//     cb(null, `${filename}.${extension}`);
//   },
// });
const multerStorage = multer.memoryStorage();

// -> FILTER
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new AppError('Not an image! Please upload images only!', 400), false);
};

//-> CALLING
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// # MULTER MIDDLEWARE (UPLOAD IMAGE)
exports.uploadUserPhoto = upload.single('photo');

// # RESIZE LARGE SIZE PHOTOS
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

// # GET ME MIDDLEWARE
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// # UPDATE YOUR ACCOUNT
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        `This route is not for password updates. Please use /updatePassword`,
        400
      )
    );

  // 2) Filter out unwanted fields names that are not allowed to be updated
  const fields = ['name', 'email'];
  const filteredBody = filterObject(req.body, ...fields);
  if (req.file) filteredBody.photo = req.file.filename;

  console.log(req.user.photo);
  // 3) If uploading new photo, delete the old one from the server.
  if (req.file && req.user.photo !== 'default.jpg')
    await deletePhotoFromServer(req.user.photo);

  // 3) Update user document
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

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: `This route is not defined. Please use /signup instead`,
  });
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
