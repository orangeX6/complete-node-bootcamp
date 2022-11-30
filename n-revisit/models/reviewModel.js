const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    // title: {
    //   type: String,
    //   required: [true, `Title can not be empty`],
    // },
    review: {
      type: String,
      required: [true, `Review can not be empty`],
    },
    rating: {
      type: Number,
      required: [true, 'Please specify the rating'],
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    // # Referencing #############
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        ratingsQuantity: { $sum: 1 },
        ratingsAverage: { $avg: '$rating' },
      },
    },
  ]);

  const { ratingsQuantity, ratingsAverage } = stats[0]
    ? stats[0]
    : { ratingsQuantity: 0, ratingsAverage: 4.5 };

  await Tour.findByIdAndUpdate(tourId, { ratingsQuantity, ratingsAverage });
};

reviewSchema.pre(/^find/, function (next) {
  // this.populate({ path: 'tour', select: 'name' }).populate({
  //   path: 'user',
  //   select: 'name photo',
  // });

  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

// # FindByIdAndDelete FindByIdAndUpdate (CALCULATE AVG REVIEWS AND RATINGS)
// # SOLUTION 1

// reviewSchema.post('save', function () {
//   this.constructor.calcAverageRatings(this.tour);
// });

// reviewSchema.pre(/^findOneAnd/, async function (next) {
//   // Mongoose does not allow executing same query twice so use clone
//   const this.r = await this.clone().findOne();
//   console.log(this.r);

//   next();
// });
// reviewSchema.post('save', async function () {
//   await this.r.constructor.calcAverageRatings(this.tour);
// });

// # SOLUTION 2
reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.tour);
});

reviewSchema.post(/^findOneAnd/, async (doc) => {
  if (doc) await doc.constructor.calcAverageRatings(doc.tour);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
