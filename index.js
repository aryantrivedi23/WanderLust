const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
require("dotenv").config();
const ExpressError = require("./utils/ExpressError.js");
const path = require("path");
const app = express();
const port = 8080;
const cookieParser = require("cookie-parser");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(cookieParser(process.env.secretcode));

mongoose.connect(process.env.mongoDBlink);

const tokenCheck = (req, res, next) => {
  const { token } = req.query;

  if (token == "giveaccess") {
    return next();
  }
  next(new ExpressError(401, "Access Denied!"));
};

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.get("/api", tokenCheck, (req, res) => {
  res.send("Private Data!");
});

app.use("/listings", listings);

app.use("/listings/:id/reviews", reviews);

app.all("/{*splat}", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  console.log(err);
  let { status = 500, message = "Internal Server Error" } = err;
  res.status(status).render("error.ejs", { message });
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
