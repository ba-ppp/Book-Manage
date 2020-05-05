var User = require('../models/user.model');
var cloudinary = require('cloudinary').v2

var defaultAvatar = cloudinary.url('avatar_x2tpec.jpg');
module.exports.index = async (req, res) => {
  var id = req.params.id;
  var user = await User.findOne({_id: id});
  res.render("users/pro", {
    user: user,
  });
};

module.exports.avatar = async (req, res) => {
  var id = req.params.id;
  var user = await User.findOne({_id: id});
  res.render('./users/update-avatar', {
    user: user,
    avatar: user.avatar || defaultAvatar
  });
};

module.exports.postAvatar = async (req, res) => {
  var file = req.file.path;
  var matchedUser = await User.findOne({_id: req.body.user_id});
  var rs = await cloudinary.uploader.upload(file, { public_id: "avatarCoders/" + req.body.user_id })
  var newAvatar = await cloudinary.url(rs.public_id);
  console.log(newAvatar);
  await User.findOneAndUpdate({_id: req.body.user_id}, {avatar: newAvatar});
  res.render('./users/update-avatar', {
    user: matchedUser,
    avatar: matchedUser.avatar || defaultAvatar
  });
};
