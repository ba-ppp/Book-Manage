var Book = require('../../models/book.model');

module.exports.index = async (req, res) => {
  // var page = req.query.page || 1;
  // var perPage = 8;
  // res.render('books/index', {
  //   books: db.get('books').drop((page - 1) * perPage).take(perPage).value()
  // })
  var books = await Book.find();
  res.json(books);
};
module.exports.update =async (req, res) => {
    var id = req.params.id;
    res.render('books/update_api',{
        id:id
    });
};

module.exports.delete = async (req, res) => {
  var id = req.params.id;
  await Book.findOneAndDelete({_id: id});
  var book = Book.find();
  res.json(book);
};
module.exports.addPost = (req, res) => {
  var book = req.body;
  
  Book.create(book);
  res.json(books);
};


module.exports.updatePost = async (req, res) => {
    var id = req.params.id;
    var title = req.body.title;
    await Book.findOneAndUpdate({_id: id}, {title: title});
    var books = await Book.find();
    res.json(books);
};