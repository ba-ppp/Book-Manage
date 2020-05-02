var db = require("../db");
var shortid = require("shortid");

module.exports.index = (req, res) => {
  var id = req.signedCookies.userId;
  var users = db.get("users").value();
  var user = db
    .get("users")
    .find({ id: id })
    .value();
  var trans = db
    .get("trans")
    .find({ userId: id })
    .value();
  if (user.isAdmin !== true) {
    var bookId = trans.bookId;
    var check = trans.isComplete;
    res.render("transactions/", {
      users: db.get("users").value(),
      id: id,
      books: db.get("books").value(),
      bookId: bookId,
    });
  } else {
    res.render("transactions/admin", {
      trans: db.get('trans').value(),
      users: db.get('users').value(),
      books: db.get('books').value()
    });
  }
};

module.exports.create = (req, res) => {
  res.render("transactions/create", {
    users: db.get("users").value(),
    books: db.get("books").value()
  });
};

module.exports.createPost = (req, res) => {
  var user = req.body.userName;
  var book = req.body.bookName;
  var userId = db
    .get("users")
    .find({ name: user })
    .value().id;
  var bookId = db
    .get("books")
    .find({ title: book })
    .value().id;
  var rs = {};
  rs.userId = userId;
  rs.bookId = bookId;
  rs.id = shortid.generate();
  db.get("trans")
    .push(rs)
    .write();
  res.redirect("/transactions");
};

module.exports.complete = (req, res) => {
  var id = req.params.id;
  var trans = db
    .get("trans")
    .find({ userId: id })
    .value();
  if (!trans) {
    res.redirect("/transactions");
    return;
  }
  if (trans.isComplete === true) res.send("Done");
  else res.send("Not Yet");
};
