const Listing = require("../models/listings");

module.exports.search = async (req, res) => {
  const { query } = req.query;
  const searchQuery = query.trim();

  if (searchQuery === "") {
    return res.redirect("/listings");
  }

  const listings = await Listing.find({
    $or: [
      { title: { $regex: searchQuery, $options: "i" } },
      { description: { $regex: searchQuery, $options: "i" } },
      { location: { $regex: searchQuery, $options: "i" } },
      { country: { $regex: searchQuery, $options: "i" } },
      { category: { $regex: searchQuery, $options: "i" } },
    ],
  });
  res.status(200).render("../views/search.ejs", { listings, query });
};
