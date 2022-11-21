const Tour = require('../models/tourModel');

// HANDLERS
exports.getAllTours = (req, res) => {
  // res.status(200).json({
  //   status: 'success',
  //   requestedAt: req.requestTime,
  //   results: tours.length,
  //   data: { tours },
  // });
};

exports.getTour = (req, res) => {
  // const tour = tours.find((el) => el.id === +req.params.id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

// Create Tour
exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      tour,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Update tour data
exports.updateTour = (req, res) => {
  // const tour = tours.find((el) => el.id === +req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour>',
    },
  });
};

//Delete tour data
exports.deleteTour = (req, res) => {
  // const tour = tours.find((el) => el.id === +req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
