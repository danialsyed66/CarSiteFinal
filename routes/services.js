var express = require("express");
var router = express.Router();
var { Services } = require("../models/services");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let services = await Services.find();
  res.render("lists/services", { services });
});

module.exports = router;
