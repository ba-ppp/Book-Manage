var express = require('express');
var router = express.Router();
var shopContr = require('../controllers/shop.controller');

router.get('/:id', shopContr.index);

router.get('/create/:id',shopContr.create);

router.post('/create/:id',shopContr.postCreate);

module.exports = router;