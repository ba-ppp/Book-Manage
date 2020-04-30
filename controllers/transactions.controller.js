var db = require('../db');
var shortid = require('shortid');

module.exports.index = (req, res) => {
  
  res.render('transaction',{
    trans: db.get('trans').value(),
    users: db.get('users').value(),
    books: db.get('books').value()
  });
};

module.exports.create = (req, res) => {
  res.render('transactioncre',{
    users: db.get('users').value(),
    books: db.get('books').value()
  })
}

module.exports.createPost = (req, res) => {
  var user = req.body.userName;
  var book = req.body.bookName;
  var userId = db.get('users').find({name: user}).value().id;
  var bookId = db.get('books').find({title: book}).value().id;
  var rs = {};
  rs.userId = userId;
  rs.bookId = bookId;
  rs.id = shortid.generate();
  db.get('trans').push(rs).write();
  res.redirect('/transactions')
}