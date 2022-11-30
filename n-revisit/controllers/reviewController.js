const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// # POST Review set Tour and User ##############
// exports.setTourUserIds = (req, res, next) => {
//   // Allowing nested routes
//   if (!req.body.tour) req.body.tour = req.params.tourId;
//   if (!req.body.user) req.body.user = req.user.id;
//   next();
// };

// # VERIFY USER BEFORE UPDATING
exports.mandateTourUserCheck = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  if (req.body.user !== req.user.id)
    return next(new AppError('Invalid user id', 401));
  next();
};

// # VERIFY USER BEFORE DELETING
exports.mandatoryUserCheck = catchAsync(async (req, res, next) => {
  if (req.user.role === 'admin') next();

  const doc = await Review.findById(req.params.id);
  if (req.user.id !== doc.user.id)
    return next(
      new AppError(
        `You cannot perform this action on someone else's review`,
        401
      )
    );
  next();
});

// # GET Review ##############
exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
