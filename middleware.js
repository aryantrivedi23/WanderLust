module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    if (req.method == "GET") {
      req.session.originalUrl = req.originalUrl;
    }
    req.flash("error", "Please login first!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirect = (req, res, next) => {
  if (req.session.originalUrl) {
    res.locals.originalUrl = req.session.originalUrl;
  }
  next();
};
