const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
require("dotenv").config();
const ExpressError = require("./utils/ExpressError.js");
const path = require("path");
const app = express();
const port = 8080;
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const sessionOptions = {
  secret: process.env.secretcode,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

app.get("/demouser", async (req, res) => {
  let fakeUser = new User({
    email: "student@gmail.com",
    username: "aryanbro",
  });

  let registerdUser = await User.register(fakeUser, "pa$$w0rd");
  res.send(registerdUser);
});

app.use("/listings", listingsRouter);

app.use("/listings/:id/reviews", reviewsRouter);

app.use("/", userRouter);

app.all("/{*splat}", (req, res, next) => {
  next(
    new ExpressError(
      404,
      `Page not found! ${req.path} tried to access ${req.originalUrl}`
    )
  );
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Internal Server Error" } = err;
  res.status(status).render("error.ejs", { message });
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
