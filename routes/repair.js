var router = require('express').Router();

var { Services } = require('../models/services');
var { Spareparts } = require('../models/spareparts');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    let services = await Services.find();
    let spareparts = await Spareparts.find();

    res.render('lists/repair', { services, spareparts });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
