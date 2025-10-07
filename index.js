const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listings.js");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema } = require("./schema/schema.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
require("dotenv").config();
const ExpressError = require("./utils/ExpressError.js");
const asyncWrap = require("./utils/asyncWrap.js");
const path = require("path");
const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

mongoose.connect(process.env.mongoDBlink);

const tokenCheck = (req, res, next) => {
  const { token } = req.query;

  if (token == "giveaccess") {
    return next();
  }
  next(new ExpressError(401, "Access Denied!"));
};

const validateReview = (req, res, next) => {
  console.log("Middleware body: ", req.body);
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    console.log("error caught by middleware");
    console.log(error);
    throw new ExpressError(400, error.message);
  } else {
    next();
  }
};

const validateListing = (req, res, next) => {
  console.log("Middleware body: ", req.body);
  let { error } = listingSchema.validate(req.body);
  if (error) {
    console.log("error caught by middleware");
    console.log(error);
    throw new ExpressError(400, error.message);
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  res.send("hi, I am root");
});

app.get("/api", tokenCheck, (req, res) => {
  res.send("Private Data!");
});

app.get(
  "/listings",
  asyncWrap(async (req, res) => {
    const allListings = await Listing.find({});
    res.status(200).render("listings/index.ejs", { allListings });
  })
);

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

app.get(
  "/listings/:id",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let result = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { result });
  })
);

app.get(
  "/listings/:id/edit",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let result = await Listing.findById(id);
    res.render("listings/edit.ejs", { result });
  })
);

app.post(
  "/listings",
  validateListing,
  asyncWrap(async (req, res) => {
    const listing = req.body;
    const newListing = await Listing(listing);
    newListing.save();
    console.log("listing added");
    res.redirect("/listings");
  })
);

app.post(
  "/listings/:id/reviews",
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

app.post("/test", (req, res) => {
  console.log("req.body: ", req.body);
  res.status(200).send("ok");
});

app.patch(
  "/listings/:id",
  asyncWrap(async (req, res) => {
    let listing = req.body.listing;
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, listing);
    console.log("patched");
    res.status(200).redirect("/listings");
  })
);

app.delete(
  "/listings/:id",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    console.log("deleted");
    res.status(200).redirect("/listings");
  })
);

app.delete(
  "/listings/:id/reviews/:reviewId",
  asyncWrap(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.status(200).redirect(`/listings/${id}`);
  })
);

app.all("/{*splat}", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Internal Server Error" } = err;
  res.status(status).render("error.ejs", { message });
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
