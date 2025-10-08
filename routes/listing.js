const express = require("express");
const router = express.Router();
const Listing = require("../models/listings.js");
const { listingSchema } = require("../schema/schema.js");
const ExpressError = require("../utils/ExpressError.js");
const asyncWrap = require("../utils/asyncWrap.js");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    console.log("error caught by middleware");
    console.log(error);
    throw new ExpressError(400, error.message);
  } else {
    next();
  }
};

router.get(
  "/",
  asyncWrap(async (req, res) => {
    const allListings = await Listing.find({});
    res.status(200).render("listings/index.ejs", { allListings });
  })
);

router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

router.get(
  "/:id",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let result = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { result });
  })
);

router.get(
  "/:id/edit",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let result = await Listing.findById(id);
    res.render("listings/edit.ejs", { result });
  })
);

router.post(
  "/",
  validateListing,
  asyncWrap(async (req, res) => {
    const listing = req.body;
    const newListing = await Listing(listing);
    newListing.save();
    console.log("listing added");
    res.redirect("/listings");
  })
);

router.patch(
  "/:id",
  asyncWrap(async (req, res) => {
    let listing = req.body.listing;
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, listing);
    console.log("patched");
    res.status(200).redirect("/listings");
  })
);

router.delete(
  "/:id",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    console.log("deleted");
    res.status(200).redirect("/listings");
  })
);

module.exports = router;
