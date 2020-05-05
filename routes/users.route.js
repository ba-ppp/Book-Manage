var express = require("express");
var router = express.Router();
var validate = require("../middleware/user.validate");
var userCont = require("../controllers/users.controller");
var countCookie = require("../middleware/cookie.count");
router.get("/", userCont.index);

router.get("/edit/:id", userCont.edit);

router.get("/delete/:id", userCont.delete);

router.post("/edit/:id", userCont.editPost);

router.post("/create", userCont.create);

module.exports = router;
