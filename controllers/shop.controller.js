var User = require('../models/user.model');
var Book = require('../models/book.model');
module.exports.create = (req, res) => {
    res.render('shops/create',{
        id: req.params.id
    });
}

module.exports.postCreate = async(req, res) => {
    await User.findByIdAndUpdate({_id: req.params.id}, {name_shop: req.body.name});
    res.redirect('/shop/' + req.params.id);
}

module.exports.index = async(req, res) => {
    var books = await Book.find();
    var user = await User.findOne({_id:req.params.id});
    res.render('shops/index',{
        books: books,
        shops: user.shop
    });
}


