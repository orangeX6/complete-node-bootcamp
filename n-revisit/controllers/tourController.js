const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// HANDLERS

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage, price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // EXECUTE QUERY
  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  // const tour = await Tour.findOne({ _id: req.params.id });
  if (!tour) return next(new AppError(`No tour found with that ID`, 404));

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// Create Tour
exports.createTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    tour,
  });
});

// Update tour data
exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) return next(new AppError(`No tour found with that ID`, 404));

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

//Delete tour data
exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) return next(new AppError(`No tour found with that ID`, 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// Aggregation pipeline
//1 TOUR STATS
exports.getTourStats = catchAsync(async (req, res, next) => {
  // aggregate.match({ department: { $in: [ "sales", "engineering" ] } });
  const stats = await Tour.aggregate()
    .match({
      ratingsAverage: { $gte: 4.5 },
    })
    .group({
      _id: { $toUpper: '$difficulty' },
      numTours: { $sum: 1 },
      numRatings: { $sum: '$ratingsQuantity' },
      avgRating: { $avg: '$ratingsAverage' },
      avgPrice: { $avg: '$price' },
      minPrice: { $min: '$price' },
      maxPrice: { $max: '$price' },
    })
    .sort({ avgRating: -1 });
  // .match({
  //   _id: { $ne: 'EASY' },
  // });

  res.status(200).json({
    status: 'success',
    results: stats.length,
    data: {
      stats,
    },
  });
});

//2 MONTHLY PLAN
exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  console.log(year);
  const plan = await Tour.aggregate()
    .unwind('$startDates')
    .match({
      startDates: {
        $gte: new Date(`${year}-01-01`),
        $lte: new Date(`${year}-12-31`),
      },
    })
    .group({
      _id: { $month: '$startDates' },
      numToursStarts: { $sum: 1 },
      tours: { $push: '$name' },
    })
    .addFields({
      month: {
        $arrayElemAt: [
          //prettier-ignore
          ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
          '$_id',
        ],
      },
    })
    .project({
      _id: 0,
    })
    .sort({
      numToursStarts: -1,
    })
    .limit(6);

  res.status(200).json({
    status: 'success',
    results: plan.length,
    data: {
      plan,
    },
  });
});
