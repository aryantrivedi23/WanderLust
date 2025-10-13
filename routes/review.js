const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const Listing = require("../models/listings.js");
const asyncWrap = require("../utils/asyncWrap.js");
const { isLoggedIn, validateReview } = require("../middleware.js");

router.post(
  "/",
  isLoggedIn,
  validateReview,
  asyncWrap(async (req, res) => {
    const id = req.params.id;

    const listing = await Listing.findById(id);
    const review = new Review(req.body);
    listing.reviews.push(review);

    await review.save();
    await listing.save();

    console.log("review posted");
    req.flash("success", "Review posted!");
    res.redirect(`/listings/${id}`);
  })
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  asyncWrap(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted!");
    res.status(200).redirect(`/listings/${id}`);
  })
);

module.exports = router;
