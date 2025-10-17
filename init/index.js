const mongoose = require("mongoose");
const { data, users } = require("./data.js");
const Listing = require("../models/listings.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
// mongoose.connect(process.env.mongoDBlink);

const main = async () => {
  await Listing.deleteMany({});
  await Review.deleteMany({});
  await User.deleteMany({});
  await Listing.insertMany(data);
  await User.insertMany(users);
  console.log("database initilized");
};

main();
