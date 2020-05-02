var express = require('express');
var router = express.Router();
var bookContr = require('../controllers/books.controller');

router.get("/", bookContr.index);

router.get("/update/:id", bookContr.update);

router.get('/delete/:id', bookContr.delete);

router.post("/add", bookContr.addPost);


router.post("/update/:id", bookContr.updatePost);

module.exports = router;