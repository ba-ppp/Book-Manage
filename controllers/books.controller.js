var db = require('../db');
var shortid = require('shortid');

module.exports.index = (request, response) => {
  response.render("books/index", {
    books: db.get("books").value()
  });
};
module.exports.update = (req, res) => {
    var id = req.params.id;
    var rs = db.get('books').find({id : id}).value();
    res.render('books/update',{
        book: rs
    });
};

module.exports.delete = (req, res) => {
  var id = req.params.id;
  var rs = db.get('books').remove({id: id}).write();
  res.redirect('/books');
};
module.exports.addPost = (req, res) => {
  var book = req.body;
  book.id = shortid.generate();
  db.get("books").push(book).write();
  res.redirect('/books');
};


module.exports.updatePost = (req, res) => {
    var id = req.params.id;
    var title = req.body.title;
    var rs = db.get('books').find({id : id}).assign({title: title}).write();
    res.redirect('/books');

};