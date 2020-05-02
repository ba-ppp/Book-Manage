var db = require("../db");
module.exports.authLogin = (req, res, next) => {
  if (!req.signedCookies.userId) {
    res.render("auth/login");
    return;
  }
  var user = db
    .get("users")
    .find({ id: req.signedCookies.userId })
    .value();
  if (!user) {
    res.render("auth/login");
    return;
  }
  next();
};
