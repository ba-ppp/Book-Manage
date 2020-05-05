require('dotenv').config();
var User = require('../models/user.model');
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcrypt");
module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var errors = [];

  var userCheck = await User.findOne({username: username});
  console.log(userCheck);
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
    
    var count = userCheck.wrongLogin;
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
    await User.findOneAndUpdate({username: username},{wrongLogin: count});
    await User.findOneAndUpdate({email: username},{wrongLogin: count});
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

  await User.findOneAndUpdate({_id: userCheck._id},{wrongLogin: 0});

  res.cookie("userId", userCheck._id, {
    signed: true
  });
  res.render("index");
};
