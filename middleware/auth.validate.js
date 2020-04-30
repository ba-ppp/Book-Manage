var db = require("../db");
module.exports.authLogin = (req, res, next) => {
  console.log(req.cookies);
  if (!req.cookies.userId) {
    res.render("auth/login");
    return;
  }
  var user = db
    .get("users")
    .find({ id: req.cookies.userId })
    .value();
  if (!user) {
    res.render("auth/login");
    return;
  }
  next();
};
