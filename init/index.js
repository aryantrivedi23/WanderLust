const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listings.js");
const Review = require("../models/review.js");

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");

const main = async () => {
  await Listing.deleteMany({});
  await Review.deleteMany({});
  await Listing.insertMany(data);
  console.log("database initilized");
};

main();
