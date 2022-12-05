const path = require('path');

const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');
const AppError = require('./utils/appError');
const globalErrorController = require('./controllers/errorController');

const app = express();
// console.log(process.env.NODE_ENV);
// console.log(app.get('env'));

// Using view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// MIDDLE WARES
// Serving static files
app.use(express.static(path.join(__dirname, `public`)));

//  Set Security HTTP headers
app.use(helmet());

app.use((req, res, next) => {
  res.removeHeader('Content-Security-Policy');
  next();
});

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'http://127.0.0.1:8000/*'],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'https:', 'data:'],
      scriptSrc: ["'self'", 'https://*.stripe.com', 'https://*.cloudflare.com'],
      frameSrc: ["'self'", 'https://*.stripe.com'],
      objectSrc: ["'none'"],
      styleSrc: ["'self'", 'https:', 'unsafe-inline'],
      upgradeInsecureRequests: [],
    },
  })
);

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
// For parsing data coming from the form. Check commented line in  .user-view__form-container in account.pug
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(cookieParser());

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

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toUTCString();
  // console.log(req.cookies);
  next();
});

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

// # EDITING SECURITY POLICY

app.use((req, res, next) => {
  const CSP = 'Content-Security-Policy';
  const POLICY =
    "default-src 'self' https://*.mapbox.com https://js.stripe.com/v3/ ws:;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/ https://api.mapbox.com https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';  upgrade-insecure-requests;";

  res.setHeader(CSP, POLICY);
  next();
});
app.use('/', viewRouter);

app.all('*', (req, res, next) =>
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404))
);

app.use(globalErrorController);

module.exports = app;
