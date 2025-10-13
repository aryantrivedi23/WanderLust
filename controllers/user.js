const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
  res.status(200).render("../views/users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = new User({
      username,
      email,
    });

    const registerdUser = await User.register(newUser, password);
    req.login(registerdUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to WanderLust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.status(200).render("../views/users/login.ejs");
};

module.exports.login = (req, res) => {
  req.flash("success", "Login Successful!");
  res.redirect(res.locals.originalUrl || "/listings");
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logout successful!");
    res.redirect("/listings");
  });
};
