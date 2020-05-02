var express = require('express');
var router = express.Router();
var proContr = require('../controllers/pro.controller');

router.get("/:id", proContr.index);

router.get('/:id/update', proContr.avatar)

module.exports = router;