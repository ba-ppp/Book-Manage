var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    userId: String,
    bookId: String,
    isComplete: Boolean
})

var Tran = mongoose.model('Tran', userSchema, 'trans');

module.exports = Tran;