const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const utilities = require('../utilities');

router.use(["/reviews/add", "/reviews/delete/:reviewId", "/reviews/update",  ], utilities.checkLogin);

// Display reviews for a vehicle
router.get('/reviews/:invId', utilities.handleErrors(reviewController.displayReviews));

// Add a review
router.post('/reviews/add', utilities.handleErrors(reviewController.addReview));

// Delete a review
router.post('/reviews/delete/:reviewId', utilities.handleErrors(reviewController.deleteReview));

// Update a review
router.post('/reviews/update', utilities.handleErrors(reviewController.updateReview));

module.exports = router;