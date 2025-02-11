const pool = require("../database/");


// Add a new review
async function addReview(reviewText, invId, accountId) {
    try {
        const sql = `
            INSERT INTO reviews (review_text, inv_id, account_id)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const result = await pool.query(sql, [reviewText, invId, accountId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error adding review:', error);
        throw error;
    }
}

// Get reviews for a specific vehicle
async function getReviewsByInventoryId(invId) {
    try {
        const sql = `
            SELECT r.*, a.account_firstname, a.account_lastname
            FROM reviews r
            JOIN account a ON r.account_id = a.account_id
            WHERE r.inv_id = $1
            ORDER BY r.review_date DESC;
        `;
        const result = await pool.query(sql, [invId]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
}

// Delete a review by review ID
async function deleteReview(reviewId) {
    try {
        const sql = 'DELETE FROM reviews WHERE review_id = $1 RETURNING *;';
        const result = await pool.query(sql, [reviewId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting review:', error);
        throw error;
    }
}

// Update a review by review ID
async function updateReview(reviewId, reviewText) {
    try {
        const sql = `
            UPDATE reviews
            SET review_text = $1
            WHERE review_id = $2
            RETURNING *;
        `;
        const result = await pool.query(sql, [reviewText, reviewId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error updating review:', error);
        throw error;
    }
}

module.exports = { addReview, getReviewsByInventoryId, deleteReview, updateReview };