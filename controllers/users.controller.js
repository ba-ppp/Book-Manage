var User = require('../models/user.model');


module.exports.index = async (req, res) => {
  var id = req.signedCookies.userId;
  var user = await User.findOne({_id: '5eb1051b962c2d6db06d7739'});
  var users = await User.find();
  if(user.isAdmin === true){
    res.render('users/admin', {
      users: users
    })
  }else
    {
      res.render('users/index', {
        users: user
      })
    }
};

module.exports.edit = (req, res) => {
  var id = req.params.id;
  res.render("users/edit", {
    id: id
  });
};

module.exports.delete = async (req, res) => {
  var id = req.params.id;
  var user = await User.find();
  await User.deleteOne({_id: id});
  res.redirect("/users");
};

module.exports.editPost = async (req, res) => {
  var name = req.body.name;
  var id = req.params.id;
  await User.findOneAndUpdate({_id: id}, {name: name})
  res.redirect("/users");
};

module.exports.create = async (req, res) => {
  var name = req.body.name;
  var user = {};
  user.name = name;
  await User.create(user);
  res.redirect("/users");
};

