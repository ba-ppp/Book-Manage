var Tran = require('../models/tran.model');
var User = require('../models/user.model');
var Book = require('../models/book.model');
module.exports.index = async (req, res) => {
  var id = req.signedCookies.userId;
  var user = await User.findOne({_id: id});
  var tran = await Tran.findOne({userId: id});
  var users = await User.find();
  var books = await Book.find();
  var trans = await Tran.find();
  if (user.isAdmin !== true) {
    var bookId = tran.bookId;
    res.render("transactions/", {
      users: users,
      id: id,
      books: books,
      bookId: bookId,
    });
  } else {
    res.render("transactions/admin", {
      trans: trans,
      users: users,
      books: books
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
