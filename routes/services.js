var router = require('express').Router();

var { Services } = require('../models/services');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    let services = await Services.find();

    res.render('lists/services', { services });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
