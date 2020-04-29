var express = require("express");
var router = express.Router();
var db = require("../db");
var shortid = require("shortid");
router.get("/", (req, res) => {
  res.render("users", {
    users: db.get("users").value()
  });
});

router.get("/edit/:id", (req, res) => {
  var id = req.params.id;
  res.render("edit", {
    id: id
  });
});

router.get("/delete/:id", (req, res) => {
  var id = req.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  res.redirect("/users");
});

router.post("/edit/:id", (req, res) => {
  var name = req.body.name;
  var id = req.params.id;
  db.get("users")
    .find({ id: id })
    .assign({ name: name })
    .write();
  res.redirect("/users");
});

router.post("/create", (req, res) => {
  var user = req.body;
  user.id = shortid.generate();
  db.get("users")
    .push(user)
    .write();
  res.redirect("/users");
});

module.exports = router;
