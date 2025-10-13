const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/asyncWrap");
const passport = require("passport");
const { saveRedirect } = require("../middleware");
const userController = require("../controllers/user");

router.get("/signup", userController.renderSignupForm);

router.post("/signup", asyncWrap(userController.signup));

router.get("/login", userController.renderLoginForm);

router.post(
  "/login",
  saveRedirect,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

router.get("/logout", userController.logout);

module.exports = router;
