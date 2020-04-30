var db = require("../db");

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var errors = [];
  var userCheck = db
    .get("users")
    .find({ username: username })
    .value();
  var passCheck = db
    .get("users")
    .find({ password: password })
    .value();
  if (!username) {
    errors.push("Username is required");
  } else if (!password) {
    errors.push("Password is required");
  } else if (!userCheck) {
    errors.push("User not exsist");
  } else if (!passCheck) {
    errors.push("Wrong password");
  }

  if(errors.length) {
    res.render("auth/login", {
      errors: errors,
      values: username
    });
  }
  var userCheck = db
    .get("users")
    .find({ username: username })
    .value();

  res.cookie("userId", userCheck.id);
  res.render("index");
};


