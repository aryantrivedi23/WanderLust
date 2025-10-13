const Review = require("../models/review.js");
const Listing = require("../models/listings.js");

module.exports.createReview = async (req, res) => {
  const id = req.params.id;

  const listing = await Listing.findById(id);
  const review = new Review(req.body);
  review.author = req.user._id;
  listing.reviews.push(review);

  await review.save();
  await listing.save();

  console.log("review posted");
  req.flash("success", "Review posted!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted!");
  res.status(200).redirect(`/listings/${id}`);
};
