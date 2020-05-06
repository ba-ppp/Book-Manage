var User = require('../../models/user.model');
const bcrypt = require("bcrypt");
require('dotenv').config();
module.exports.index = async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var errors = [];
  
    var userCheck = await User.findOne({username: username});
    if (!userCheck) {
      userCheck = await User.findOne({email: username});
    }
  
    var checkPass = bcrypt.compareSync(password, userCheck.password);
  
    if (!username) {
      errors.push("Username is required");
    } else if (!password) {
      errors.push("Password is required");
    } else if (!userCheck) {
      errors.push("User not exsist");
    } else if (!checkPass) {
      errors.push("Wrong password");
    }
    if (errors.length) {
      res.render("auth/login", {
        errors: errors,
        values: username
      });
      return;
    }
    await User.findOneAndUpdate({_id: userCheck._id},{wrongLogin: 0});
  
    res.cookie("userId", userCheck._id, {
      signed: true
    });
    res.json('Success');
}

module.exports.login = async (req, res) => {
    res.render('login');
}