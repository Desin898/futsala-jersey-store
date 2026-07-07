// Log to confirm the script is loaded
console.log("Reviews script loaded!");

// Main function to initialize reviews
function initReviews() {
    try {
        const productId = getProductId();
        if (!productId) {
            console.error("No product ID found");
            return;
        }
        loadReviews(productId);
    } catch (error) {
        console.error("Failed to initialize reviews:", error);
    }
}

// load and display reviews
async function loadReviews(productId) {
    try {
        // Show loading state
        const reviewsContainer = document.getElementById('reviews-container');
        if (!reviewsContainer) {
            console.error("Reviews container not found!");
            return;
        }
        
        reviewsContainer.innerHTML = '<p class="loading-text">Loading reviews...</p>';

        // Fetch and parse reviews
        const response = await fetch('reviews.xml');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.text();
        const xmlDoc = new DOMParser().parseFromString(data, "text/xml");
        
        // Validate XML structure
        if (xmlDoc.querySelector('parsererror')) {
            throw new Error("Invalid XML format");
        }

        // Get reviews for current product
        const reviews = xmlDoc.querySelectorAll(`product[id="${productId}"] review`);
        if (reviews.length === 0) {
            reviewsContainer.innerHTML = '<p class="no-reviews">No reviews yet for this product.</p>';
            return;
        }

        // Generate reviews HTML
        const reviewsHTML = Array.from(reviews).map(review => {
            const user = review.querySelector('user')?.textContent || 'Anonymous';
            const rating = review.querySelector('rating')?.textContent || '0';
            const comment = review.querySelector('comment')?.textContent || 'No comment provided';
            
            return `
                <div class="review">
                    <div class="review-header">
                        <span class="review-user">${user}</span>
                        <span class="review-rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</span>
                    </div>
                    <div class="review-comment">${comment}</div>
                </div>
            `;
        }).join('');

        // Insert reviews into the container
        reviewsContainer.innerHTML = reviewsHTML;
        
        // Update ratings summary if exists
        updateRatingsSummary(reviews);

    } catch (error) {
        console.error('Error loading reviews:', error);
        const reviewsContainer = document.getElementById('reviews-container');
        if (reviewsContainer) {
            reviewsContainer.innerHTML = '<p class="error-message">Failed to load reviews. Please try again later.</p>';
        }
    }
}

// Improved product ID detection
function getProductId() {
    try {
        // 1. Check HTML data attribute first
        const productElement = document.querySelector('[data-product-id]');
        if (productElement) {
            return productElement.getAttribute('data-product-id');
        }

        // 2. Fallback to URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('productId');
    } catch (error) {
        console.error("Error getting product ID:", error);
        return null;
    }
}

// Helper function to update ratings summary
function updateRatingsSummary(reviews) {
    try {
        const ratingsSummary = document.querySelector('.expanded-section h3');
        if (!ratingsSummary) return;

        const totalReviews = reviews.length;
        const totalRating = Array.from(reviews).reduce((sum, review) => {
            return sum + parseInt(review.querySelector('rating')?.textContent || 0);
        }, 0);
        
        const averageRating = totalRating / totalReviews;
        
        // Update the ratings text
        if (ratingsSummary.textContent.includes('Ratings')) {
            ratingsSummary.textContent = `Ratings (${totalReviews}) ${averageRating.toFixed(1)} ${'★'.repeat(Math.round(averageRating))}${'☆'.repeat(5 - Math.round(averageRating))}`;
        }
    } catch (error) {
        console.error("Error updating ratings summary:", error);
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initReviews);