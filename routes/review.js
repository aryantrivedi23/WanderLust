const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const { reviewSchema } = require("../schema/schema.js");
const Listing = require("../models/listings.js");
const asyncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    console.log("error caught by middleware");
    console.log(error);
    throw new ExpressError(400, error.message);
  } else {
    next();
  }
};

router.post(
  "/",
  validateReview,
  asyncWrap(async (req, res) => {
    const id = req.params.id;

    const listing = await Listing.findById(id);
    const review = new Review(req.body);
    listing.reviews.push(review);

    await review.save();
    await listing.save();

    console.log("review posted");
    res.redirect(`/listings/${id}`);
  })
);

router.delete(
  "/:reviewId",
  asyncWrap(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.status(200).redirect(`/listings/${id}`);
  })
);

module.exports = router;
