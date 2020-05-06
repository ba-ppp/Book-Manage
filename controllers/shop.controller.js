var Shop = require('../models/shop.model');

module.exports.create = async(req, res) => {
    var name = req.body.name;
    await Shop.create(name);
    res.render('shops/index');
}
