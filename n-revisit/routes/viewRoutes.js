const express = require('express');

const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/me', authController.protect, viewsController.getAccount);
router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

router.use(authController.isLoggedIn);
router.get('/', viewsController.getOverview);
router.get('/login', viewsController.getLoginForm);
router.get('/signup', viewsController.getSignUpForm);

router.use((req, res, next) => {
  res.removeHeader('Cross-Origin-Embedder-Policy');
  next();
});
router.get('/tour/:slug', viewsController.getTour);

module.exports = router;
