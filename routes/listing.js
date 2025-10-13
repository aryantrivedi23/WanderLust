const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/asyncWrap.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const ListingController = require("../controllers/listing.js");

router.get("/", asyncWrap(ListingController.index));

router.get("/new", isLoggedIn, ListingController.createListingForm);

router.get("/:id", asyncWrap(ListingController.showListing));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  asyncWrap(ListingController.editForm)
);

router.post(
  "/",
  isLoggedIn,
  validateListing,
  asyncWrap(ListingController.postListing)
);

router.patch(
  "/:id",
  isLoggedIn,
  isOwner,
  asyncWrap(ListingController.editListing)
);

router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  asyncWrap(ListingController.destroyListing)
);

module.exports = router;
