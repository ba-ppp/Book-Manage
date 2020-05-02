var express = require("express");
var router = express.Router();
var tranContr = require("../controllers/transactions.controller");

router.get("/", (req,res) => {
  res.send('hi');
})

router.get("/create", tranContr.create);

router.get('/:id/complete',tranContr.complete);

router.get("/:id", tranContr.index);

router.post("/create", tranContr.createPost);

module.exports = router;
