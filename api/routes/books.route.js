var express = require("express");
var router = express.Router();
var bookContr = require("../controllers/books.controller");

router.get('/', bookContr.index);

router.get('/update/:id',bookContr.update);

router.put('/update/:id',bookContr.updatePost);

module.exports = router;
