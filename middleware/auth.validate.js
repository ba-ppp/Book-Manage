var User = require('../models/user.model');
module.exports.authLogin = (req, res, next) => {
  if (!req.signedCookies.userId) {
    res.render("auth/login");
    return;
  }
  var user = User.findOne({_id: req.signedCookies.userId});
  if (!user) {
    res.render("auth/login");
    return;
  }
  next();
};
