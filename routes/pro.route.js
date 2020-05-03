var express = require('express');
var router = express.Router();
var proContr = require('../controllers/pro.controller');
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });

router.get("/:id", proContr.index);

router.get('/:id/update', proContr.avatar)

router.post('/update-avatar', upload.single('avatar'), proContr.postAvatar);

module.exports = router;