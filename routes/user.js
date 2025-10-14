const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/asyncWrap");
const passport = require("passport");
const { saveRedirect } = require("../middleware");
const userController = require("../controllers/user");

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(asyncWrap(userController.signup));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirect,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

router.get("/logout", userController.logout);

module.exports = router;
