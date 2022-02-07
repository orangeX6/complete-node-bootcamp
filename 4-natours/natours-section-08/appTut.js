const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

//middleware
app.use(express.json());

// 50
// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });
////////////////////////////////////////////////////////////////

//* 52 Handling GET Requests
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

/////////////////////////////////////////////////////////////
//* 54 Responding to URL Patterns
app.get('/api/v1/tours/:id', (req, res) => {
  // console.log(req.params);
  //CONVERT STRING TO NUMBER
  // const id = +req.params.id;
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  // console.log(tour);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

///////////////////////////////////////////////////////////
//* 53 Handling POST Requests
app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);

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
});

/////////////////////////////////////////////////////////
//* 55 Handling PATCH Requests
app.patch('/api/v1/tours/:id', (req, res) => {
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
});

////////////////////////////////////////////////////
//* 56 Handling DELETE Requests
app.delete('/api/v1/tours/:id', (req, res) => {
  const id = +req.params.id;

  if (id > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Id not found',
    });
  }
  tours.splice(id, 1);
  // console.log(tours);

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
});

/////////////////////////////////////////////////////
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}. . .`);
});
