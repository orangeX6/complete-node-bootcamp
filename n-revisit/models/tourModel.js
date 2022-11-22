const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const options = {
  toJSON: { virtuals: true },
};

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `A tour must have a name`],
      unique: true,
      trim: true,
      maxLength: [
        40,
        'Tour name must have less than or equal to 40 characters',
      ],
      minLength: [
        10,
        'Tour name must have more than or equal to 40 characters',
      ],
      // validate: [validator.isAlpha, 'Tour name must only contain characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    description: {
      type: String,
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        lowercase: true,
        message:
          '{VALUE} is not supported. Accepted Values - easy, medium, difficult',
      },
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    price: {
      type: Number,
      required: [true, `A tour must have a price`],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be lower than regular price',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be between 1.0 and 5.0'],
      max: [5, 'Rating must be between 1.0 and 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    secretTour: {
      type: Boolean,
      default: false,
      select: false,
    },
    slug: String,
    startDates: {
      type: [Date],
      // validate: {
      //   validator: function (val) {
      //     return Date.now() < val;
      //   },
      //   message: `Tour must begin in the future.({VALUE} has already passed)`,
      // },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
  },
  options
);

// DOCUMENT MIDDLEWARE .. runs before save() and create() commands
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  // console.log(docs);
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

//AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  // console.log(this.pipeline());
  next();
});

// VIRTUAL VALUES
tourSchema.virtual('durationWeeks').get(function () {
  return `${(this.duration / 7).toFixed(2)} weeks`;
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
