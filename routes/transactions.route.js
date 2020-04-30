var express = require("express");
var router = express.Router();
var tranContr = require("../controllers/transactions.controller");

router.get("/", tranContr.index);

router.get("/create", tranContr.create);

router.post("/create", tranContr.createPost);

module.exports = router;
