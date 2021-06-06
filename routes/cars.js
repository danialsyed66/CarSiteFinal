var express = require('express');
var router = express.Router();
var car = require("../models/cars");
var sparepart = require("../models/spareparts");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let cars = await car.find();
  let spareparts = await sparepart.find();
  res.render("lists/cars", {cars, spareparts});
});

module.exports = router;
