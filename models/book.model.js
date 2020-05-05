var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    title: String,
    des: String,
})

var Book = mongoose.model('Book', bookSchema, 'books');

module.exports = Book;