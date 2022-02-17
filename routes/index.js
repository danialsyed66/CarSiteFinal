var router = require('express').Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Car Site' });
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'Car Site' });
});

router.get('/cart', function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  
  res.render('cart', { cart });
});

router.get('/signin', function (req, res, next) {
  res.render('partials/logInModal');
});

module.exports = router;
