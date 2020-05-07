var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    wrongLogin: Number,
    avatar: String,
    name_shop: String,
    shop: Array
})

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;