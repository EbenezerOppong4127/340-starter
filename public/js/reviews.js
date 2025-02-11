$(document).ready(function () {
    // Handle "Update" button click
    $('.update-review-btn').click(function (e) {
        e.preventDefault(); // Prevent default link behavior

        const reviewId = $(this).data('review-id'); // Get review ID
        const reviewText = $(`#review_${reviewId} .review-text`).text(); // Get current review text

        // Debugging: log the reviewId and reviewText
        console.log("Updating review ID:", reviewId);
        console.log("Current review text:", reviewText);

        // Hide the button container so that Delete/Update buttons are hidden
        $(`#review_${reviewId} .button-container`).hide();

        // Replace the review text <p> with a textarea and add "Save" and "Cancel" buttons
        $(`#review_${reviewId} .review-text`).replaceWith(`
            <textarea class="edit-review-text" id="edit-review-text-${reviewId}">${reviewText}</textarea>
            <button class="save-review-btn" data-review-id="${reviewId}">Save</button>
            <button class="cancel-review-btn" data-review-id="${reviewId}">Cancel</button>
        `);
    });

    // Handle "Save" button click
    $(document).on('click', '.save-review-btn', function () {
        const reviewId = $(this).data('review-id'); // Get review ID
        const updatedText = $(`#edit-review-text-${reviewId}`).val(); // Get updated review text

        // Debugging: log the updated review text
        console.log("Saving review ID:", reviewId);
        console.log("Updated review text:", updatedText);

        // Send update request to the server
        $.post('/rev/reviews/update', { reviewId, reviewText: updatedText }, function (response) {
            console.log("Server response:", response); // Debugging: log server response
            location.reload(); // Reload the page to reflect changes
        }).fail(function (error) {
            console.log("Error:", error); // Debugging: log errors if any
        });
    });

    // Handle "Cancel" button click
    $(document).on('click', '.cancel-review-btn', function () {
        const reviewId = $(this).data('review-id'); // Get review ID
        const originalText = $(`#edit-review-text-${reviewId}`).val(); // Get original text

        // Debugging: log the action
        console.log("Cancelling edit for review ID:", reviewId);
        console.log("Original review text:", originalText);

        // Replace the <textarea> with the original <p> tag containing the review text
        $(`#edit-review-text-${reviewId}`).replaceWith(`<p class="review-text">${originalText}</p>`);
        // Remove the "Save" and "Cancel" buttons
        $(this).siblings('.save-review-btn').remove();
        $(this).remove();

        // Show the button container again
        $(`#review_${reviewId} .button-container`).show();
    });
});

// Local Storage functionality for saving review content (if applicable)
const reviewTextarea = document.querySelector('.saveItlocal');

// Function to save the content to local storage
function saveReview() {
    const reviewContent = reviewTextarea.value;
    const expiryTime = new Date().getTime() + 60 * 60 * 1000; // 60 minutes from now
    const reviewData = {
        content: reviewContent,
        expiry: expiryTime
    };
    localStorage.setItem('reviewData', JSON.stringify(reviewData));
}

// Function to load the content from local storage if available
function loadReview() {
    const storedData = JSON.parse(localStorage.getItem('reviewData'));
    if (storedData && storedData.expiry > new Date().getTime()) {
        reviewTextarea.value = storedData.content;
    } else {
        localStorage.removeItem('reviewData'); // Remove expired data
    }
}

// Save the review whenever the user types, and load on page load
if (reviewTextarea) {
    reviewTextarea.addEventListener('input', saveReview);
    loadReview();
}
