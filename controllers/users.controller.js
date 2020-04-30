var db = require("../db");
var shortid = require("shortid");

module.exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
};

module.exports.edit = (req, res) => {
  var id = req.params.id;
  res.render("users/edit", {
    id: id
  });
};

module.exports.delete = (req, res) => {
  var id = req.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  res.redirect("/users");
};

module.exports.editPost = (req, res) => {
  var name = req.body.name;
  var id = req.params.id;
  db.get("users")
    .find({ id: id })
    .assign({ name: name })
    .write();
  res.redirect("/users");
};

module.exports.create = (req, res) => {
  var user = req.body;
  user.id = shortid.generate();

  db.get("users")
    .push(user)
    .write();
  res.redirect("/users");
};
