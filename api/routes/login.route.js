var express = require("express");
var router = express.Router();
var loginContr = require("../controllers/login.controller");

router.get('/',loginContr.login);

router.post('/',loginContr.index);

module.exports = router;