const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).render('base', {
//     title: 'Exciting tours for adventurous people',
//     tour: 'The Forest Hiker',
//     user: 'Orange',
//   });
// });

router.get('/', viewController.getOverview);

router.get('/tour', viewController.getTour);

module.exports = router;
