var router = require('express').Router();

var { Cars } = require('../models/cars');
var { Spareparts } = require('../models/spareparts');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    let cars = await Cars.find();
    let spareparts = await Spareparts.find();

    res.render('lists/buy', { cars, spareparts });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
