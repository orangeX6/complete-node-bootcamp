const Tour = require('../models/tourModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// # HANDLERS
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage, price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour, {
  path: 'reviews',
  select: 'review rating',
});
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

// # AGGREGATION PIPELINE
//-> 1 TOUR STATS
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

//-> 2 MONTHLY PLAN
exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

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

// # GEO SPATIAL DATA

// # TOURS WITHIN A CERTAIN RADIUS
// /tours-within?distance=250&center=-40,45&unit=km
// /tours-within/250/center/-40,45/unit/km
exports.getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1; // RADIUS HAS TO BE IN RADIANS

  if (!lat || !lng)
    next(
      new AppError(
        `Please provide latitude and longitude in format lat,lng`,
        400
      )
    );

  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// # DISTANCE OF EACH TOUR FROM A GIVEN POINT
// /distances/:latlng/unit/:unit

exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lng)
    next(
      new AppError(
        `Please provide latitude and longitude in format lat,lng`,
        400
      )
    );

  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    results: distances.length,
    data: {
      data: distances,
    },
  });
});
