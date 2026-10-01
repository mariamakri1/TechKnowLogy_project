const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews.controller');

router.post('/', reviewsController.createReview);
router.get('/', reviewsController.getReviews);

module.exports = router;
