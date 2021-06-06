var express = require('express');
var router = express.Router();
var service = require("../models/spareparts");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let spareparts = await service.find();
  console.log(spareparts);
  res.render("lists/cars", {spareparts});
});

module.exports = router;
