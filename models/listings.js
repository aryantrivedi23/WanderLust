const mongoose = require("mongoose");
const Review = require("./review.js");

const listingsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: [String],
    enum: [
      "rooms",
      "city",
      "mountains",
      "castles",
      "pools",
      "camping",
      "farms",
      "arctic",
    ],
  },
});

listingsSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingsSchema);

module.exports = Listing;
