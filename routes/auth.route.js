var express = require("express");
var router = express.Router();
var authContr = require("../controllers/auth.controller");

router.get("/login", authContr.login);

router.post("/login", authContr.postLogin);

module.exports = router;
