const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.checkID);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours)
  .get(tourController.aliasTopTours, tourController.getAllTours);
//IMPORTANT We can add the catchAsync here as well
//.get(catchAsync(tourController.aliasTopTours, tourController.getAllTours));

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

//prettier-ignore
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

//prettier-ignore
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
