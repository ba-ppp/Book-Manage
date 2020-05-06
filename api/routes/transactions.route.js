var express = require("express");
var router = express.Router();
var tranContr = require("../controllers/transactions.controller");

router.get('/', tranContr.index);

module.exports = router;