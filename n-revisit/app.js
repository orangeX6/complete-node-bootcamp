const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const AppError = require('./utils/appError');
const globalErrorController = require('./controllers/errorController');

const app = express();
// MIDDLE WARES
// console.log(process.env.NODE_ENV);
// console.log(app.get('env'));

// 1) GLOBAL MIDDLE WARES
//  Set Security HTTP headers
app.use(helmet());
// Development logging
// eslint-disable-next-line no-unused-expressions
process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

const limiter = rateLimit({
  max: 60,
  windowMs: 1000 * 60 * 60,
  message: `Too many requests from this IP, please try again in an hour`,
});
app.use('/api', limiter);

// Body parser, reading dta from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data Sanitization against no SQL query injection
app.use(mongoSanitize());

// Data Sanitization against XSS ( CROSS SITE SCRIPTING )
app.use(xss());

// Parameter Pollution Prevention
app.use(
  hpp({
    whitelist: [
      'name',
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
      'role',
    ],
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toUTCString();
  next();
});

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) =>
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404))
);

app.use(globalErrorController);

module.exports = app;
