var mongoose = require('mongoose');

var shopSchema = mongoose.Schema({
    title: String,
    bookId: String,
})

var Shop = mongoose.model('Shop', userSchema, 'shops');

module.exports = Shop;