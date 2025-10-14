const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/asyncWrap.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const ListingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(asyncWrap(ListingController.index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("image"),
    asyncWrap(ListingController.postListing)
  );

router.get("/new", isLoggedIn, ListingController.createListingForm);

router
  .route("/:id")
  .get(asyncWrap(ListingController.showListing))
  .patch(
    isLoggedIn,
    isOwner,
    validateListing,
    upload.single("listing[image]"),
    asyncWrap(ListingController.editListing)
  )
  .delete(isLoggedIn, isOwner, asyncWrap(ListingController.destroyListing));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  asyncWrap(ListingController.editForm)
);

module.exports = router;
