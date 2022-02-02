'use strict';

const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

//-> 1 MIDDLEWARE->
app.use(express.json());
app.use(morgan('dev')); // takes 'dev', 'combined', 'short', 'tiny', 'common'

// Own MiddleWare Function
app.use((req, res, next) => {
  console.log('Hello from the middleware 👋🏻');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3rd Party Middleware function
// Morgan (npm i morgan)

// Reading data from file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//////////////////////////////////////////////////////////////
//-> 2 ROUTE HANDLERS->

//>> TOURS
const getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
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

const updateTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const updatedTour = { ...tour, ...req.body };
  const updatedTours = tours.map((tour) =>
    tour.id === updatedTour.id ? updatedTour : tour
  );

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      res.status(200).json({
        status: 'success',
        results: updatedTours.length,
        data: {
          tours: updatedTours,
        },
      });
    }
  );
};

const deleteTour = (req, res) => {
  const id = +req.params.id;

  if (id > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Id not found',
    });
  }

  tours.splice(id, 1);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};

//>> USERS
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

/////////////////////////////////////////////////////////////
//-> 3 ROUTES ->

const tourRouter = express.Router();
const userRouter = express.Router();

//prettier-ignore
tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour);

//prettier-ignore
tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

//prettier-ignore
userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser);

//prettier-ignore
userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
/////////////////////////////////////////////////////
//-> 4 START SERVER ->
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}. . .`);
});
