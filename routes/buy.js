var express = require("express");
var router = express.Router();
var { Cars } = require("../models/cars");
var { Spareparts } = require("../models/spareparts");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let cars = await Cars.find();
  let spareparts = await Spareparts.find();
  res.render("lists/buy", { cars, spareparts });
});

module.exports = router;
