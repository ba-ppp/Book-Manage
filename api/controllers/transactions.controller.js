var Trans = require('../../models/tran.model');

module.exports.index = async (req, res) => {
    var trans = await Trans.find();
    res.json(trans);
}