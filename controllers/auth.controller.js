require('dotenv').config();
var db = require("../db");
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcrypt");
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
  if (!userCheck) {
    userCheck = db
      .get("users")
      .find({ email: username })
      .value();
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
    var check = db
      .get("users")
      .find({ username: username })
      .value();
    if (!check) {
      check = db
        .get("users")
        .find({ email: username })
        .value();
    }
    var count = check.wrongLogin;
    count++;
    if (count >= 4) {
      var er = [];
      er.push("Your account was locked currently");
      res.render('auth/login', {
        errors: er,
        values: username
      })
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: "phuongtr3112@gmail.com",
        from: "phuongB1908407@student.ctu.edu.vn",
        subject: "Sending with Twilio SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>"
      };
      sgMail.send(msg).then(
        () => {},
        error => {
          console.error(error);
          if (error.response) {
            console.error(error.response.body);
          }
        }
      );
      return;
    }
    db.get("users")
      .find({ username: username })
      .assign({ wrongLogin: count })
      .write();
    db.get("users")
      .find({ email: username })
      .assign({ wrongLogin: count })
      .write();
  }

  if (errors.length) {
    res.render("auth/login", {
      errors: errors,
      values: username
    });
    return;
  }
  if (userCheck.wrongLogin >= 4) {
    var er = [];
    er.push("Your account was locked currently");
    res.render("auth/login", {
      errors: er,
      values: username
    });
    return;
  }

  db.get("users")
    .find({ id: userCheck.id })
    .assign({ wrongLogin: 0 })
    .write();

  res.cookie("userId", userCheck.id, {
    signed: true
  });
  res.render("index");
};
