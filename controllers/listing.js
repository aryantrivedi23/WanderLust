const Listing = require("../models/listings");

module.exports.index = async (req, res) => {
  const { tab } = req.query;
  let allListings;

  if (tab && tab !== "trending") {
    allListings = await Listing.find({ category: tab });
  } else {
    allListings = await Listing.find({});
  }

  res.status(200).render("listings/index.ejs", { allListings, tab });
};

module.exports.createListingForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
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
};

module.exports.editForm = async (req, res) => {
  let { id } = req.params;
  let result = await Listing.findById(id);
  res.render("listings/edit.ejs", { result });
};

module.exports.postListing = async (req, res) => {
  const url = req.file.path;
  const filename = req.file.filename;

  const listing = req.body;
  const newListing = await Listing(listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.save();
  req.flash("success", "Listing added!");
  console.log("listing added");
  res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
  const { id } = req.params;
  const listing = req.body.listing;

  if (typeof req.file !== "undefined") {
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = { url, filename };
  }

  await Listing.findByIdAndUpdate(id, listing);
  console.log("patched");
  req.flash("success", "Listing updated!");
  res.status(200).redirect("/listings");
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  console.log("deleted");
  req.flash("success", "Listing deleted!");
  res.status(200).redirect("/listings");
};
