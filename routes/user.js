const express = require("express");
const router = express.Router();
const User = require("../models/user");
const asyncWrap = require("../utils/asyncWrap");
const passport = require("passport");

router.get("/signup", (req, res) => {
  res.status(200).render("../views/users/signup.ejs");
});

router.post(
  "/signup",
  asyncWrap(async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const newUser = new User({
        username,
        email,
      });

      const registerdUser = await User.register(newUser, password);
      console.log(registerdUser);
      req.flash("success", "Welcome to WanderLust!");
      res.redirect("/listings");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  })
);

router.get("/login", (req, res) => {
  res.status(200).render("../views/users/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Login Successful!");
    res.redirect("/listings");
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logout successful!");
    res.redirect("/listings");
  });
});

module.exports = router;
