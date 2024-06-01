const express = require("express");
const router = express.Router({mergeParams : true });
const wrapAsy = require("../utils/wrapAsync.js");
const Listing = require('../models/listing.js');
const { validateReview, isLoggedIn, isOwner, isReviewAuthor } = require("../middleware.js");
const Review = require('../models/review.js');

const reviewController = require("../controllers/review.js");
 

// Delete review Route
router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsy(reviewController.destroyReview)
);

// Post Review Route
router.post( 
    "/", 
    isLoggedIn,
    validateReview,
    wrapAsy(reviewController.newReview)
);


module.exports = router;