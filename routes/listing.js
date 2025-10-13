const express = require("express");
const router = express.Router();
const Listing = require("../models/listings.js");
const asyncWrap = require("../utils/asyncWrap.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

router.get(
  "/",
  asyncWrap(async (req, res) => {
    const allListings = await Listing.find({});
    res.status(200).render("listings/index.ejs", { allListings });
  })
);

router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

router.get(
  "/:id",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let result = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .populate("owner");
    if (!result) {
      req.flash("error", "This listing doesn't exists.");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { result });
  })
);

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let result = await Listing.findById(id);
    res.render("listings/edit.ejs", { result });
  })
);

router.post(
  "/",
  isLoggedIn,
  validateListing,
  asyncWrap(async (req, res) => {
    const listing = req.body;
    const newListing = await Listing(listing);
    newListing.owner = req.user._id;
    newListing.save();
    req.flash("success", "Listing added!");
    console.log("listing added");
    res.redirect("/listings");
  })
);

router.patch(
  "/:id",
  isLoggedIn,
  isOwner,
  asyncWrap(async (req, res) => {
    let listing = req.body.listing;
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, listing);
    console.log("patched");
    req.flash("success", "Listing updated!");
    res.status(200).redirect("/listings");
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    console.log("deleted");
    req.flash("success", "Listing deleted!");
    res.status(200).redirect("/listings");
  })
);

module.exports = router;
