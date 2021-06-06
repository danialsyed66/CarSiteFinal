var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Car Site' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Car Site' });
});

module.exports = router;
