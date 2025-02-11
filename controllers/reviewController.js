const reviewModel = require('../models/review-model');
const utilities = require('../utilities');

// Display reviews for a specific vehicle
async function displayReviews(req, res) {
    const invId = parseInt(req.params.invId);
    try {
        const reviews = await reviewModel.getReviewsByInventoryId(invId);
        res.render('inventory/reviews', {
            title: 'Vehicle Reviews',
            reviews,
            invId,
            errors: null,
        });
    } catch (error) {
        console.error('Error displaying reviews:', error);
        res.status(500).send('Internal Server Error');
    }
}

// Add a new review
async function addReview(req, res) {
    const { reviewText, invId } = req.body;
    const accountId = res.locals.accountData?.account_id; // Get accountId from session

    // Debugging logs
    console.log("Received data:", { reviewText, invId, accountId });

    // Validate input
    if (!reviewText || !invId || !accountId) {
        req.flash('error', 'Invalid input: Missing review text, inventory ID, or account ID.');
        return res.redirect('/some-error-page');
    }

    try {
        await reviewModel.addReview(reviewText, invId, accountId);
        req.flash('notice', 'Review added successfully.');
        res.redirect(`/inv/detail/${invId}`);
    } catch (error) {
        console.error('Error adding review:', error);
        req.flash('error', 'Failed to add review.');
        res.redirect(`/inv/detail/${invId}`);
    }
}



// Delete a review
async function deleteReview(req, res) {
    const reviewId = parseInt(req.params.reviewId);
    try {
        await reviewModel.deleteReview(reviewId);
        req.flash('notice', 'Review deleted successfully.');
        res.redirect('back');
    } catch (error) {
        console.error('Error deleting review:', error);
        req.flash('error', 'Failed to delete review.');
        res.redirect('back');
    }
}
// Update a review
async function updateReview(req, res) {
    const { reviewId, reviewText } = req.body;
    try {
        await reviewModel.updateReview(reviewId, reviewText);
        req.flash('notice', 'Review updated successfully.');
        res.redirect('back');
    } catch (error) {
        console.error('Error updating review:', error);
        req.flash('error', 'Failed to update review.');
        res.redirect('back');
    }
}

module.exports = { displayReviews, addReview, deleteReview, updateReview };