var express = require('express');
var db = require('../db');
var router = express.Router();
var shortid = require('shortid');

router.get("/", (request, response) => {
  response.render("index", {
    books: db.get("books").value()
  });
});
router.get("/update/:id", (req, res) => {
    var id = req.params.id;
    var rs = db.get('books').find({id : id}).value();
    res.render('update',{
        book: rs
    });
});

router.get('/delete/:id', (req, res) => {
  var id = req.params.id;
  var rs = db.get('books').remove({id: id}).write();
  res.redirect('/books');
});
router.post("/add", (req, res) => {
  var book = req.body;
  book.id = shortid.generate();
  db.get("books").push(book).write();
  res.redirect('/books');
});


router.post("/update/:id", (req, res) => {
    var id = req.params.id;
    var title = req.body.title;
    var rs = db.get('books').find({id : id}).assign({title: title}).write();
    res.redirect('/books');

});

module.exports = router;