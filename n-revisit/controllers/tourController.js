const fs = require('fs');

// READ FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

// HANDLERS

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);

  if (!tours.find((el) => el.id === +req.params.id))
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });

  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

exports.getTour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

// Create Tour
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res.status(400).json({
      status: 'fail',
      message: 'name and price are required',
    });
  next();
};

exports.createTour = (req, res) => {
  const newId = tours.at(-1).id + 1;

  //   const newTour = Object.assign({ id: newId }, req.body);
  const newTour = { id: newId, ...req.body };

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    'utf-8',
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

// Update tour data
exports.updateTour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour>',
    },
  });
};

//Delete tour data
exports.deleteTour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
