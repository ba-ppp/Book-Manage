var db = require("../db");
var cloudinary = require('cloudinary').v2

var defaultAvatar = cloudinary.url('avatar_x2tpec.jpg');
module.exports.index = (req, res) => {
  var id = req.params.id;
  var user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("users/pro", {
    user: user,
  });
};

module.exports.avatar = (req, res) => {
  var id = req.params.id;
  var user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render('./users/update-avatar', {
    user: user,
    avatar: user.avatar || defaultAvatar
  });
};
