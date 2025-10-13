const Listing = require("./models/listings");
const { listingSchema } = require("./schema/schema.js");
const { reviewSchema } = require("./schema/schema.js");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    if (req.method == "GET") {
      req.session.originalUrl = req.originalUrl;
    }
    req.flash("error", "Please login first!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirect = (req, res, next) => {
  if (req.session.originalUrl) {
    res.locals.originalUrl = req.session.originalUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (
    res.locals.currentUser &&
    res.locals.currentUser._id.equals(listing.owner)
  ) {
    return next();
  }
  req.flash("error", "Unauthorized Action!");
  res.redirect(`/listings/${id}`);
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    console.log("error caught by middleware");
    console.log(error);
    throw new ExpressError(400, error.message);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    console.log("error caught by middleware");
    console.log(error);
    throw new ExpressError(400, error.message);
  } else {
    next();
  }
};
