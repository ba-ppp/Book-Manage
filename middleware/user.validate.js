var db = require("../db");
module.exports.postCreate = function(req, res, next) {
  var check = req.body.name;
  var errors = [];
  if (!check) {
    errors.push("Name is required");
  }
  if (check.length > 30) {
    errors.push("Name not more 30 characters");
  }
  if(errors){
    res.render("users/", {
      errors: errors,
      users: db.get("users").value()
    });
    return;
  }
  next();
};
