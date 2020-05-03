var db = require("../db");
var cloudinary = require('cloudinary').v2
var multer = require('multer');

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

module.exports.postAvatar = async (req, res) => {
  var file = req.file.path;
  var matchedUser = db.get('users').find({ id: req.body.user_id}).value();
  var rs = await cloudinary.uploader.upload(file, { public_id: "avatarCodersX/" + req.body.user_id })
  var newAvatar = await cloudinary.url(rs.public_id);
  console.log(newAvatar);
  db.get('users')
    .find({ id: req.body.user_id })
    .assign({ avatar: newAvatar })
    .write();
  res.render('./users/update-avatar', {
    user: matchedUser,
    avatar: matchedUser.avatar || defaultAvatar
  });
};
