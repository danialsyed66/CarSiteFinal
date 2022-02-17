var router = require('express').Router();

var { Cars } = require('../../models/cars');
const validateCars = require('../../middlewares/validateCars');
var auth = require('../../middlewares/auth');
var admin = require('../../middlewares/admin');

//get cars
router.get('/', async (req, res) => {
  try {
    let page = Number(req.query.page ? req.query.page : 1);
    let perPage = Number(req.query.perPage ? req.query.perPage : 10);
    let skipRecords = perPage * (page - 1);
    let cars = await Cars.find().skip(skipRecords).limit(perPage);

    return res.send(cars);
  } catch (err) {
    console.log(err);
  }
});

//get single cars
router.get('/:id', async (req, res) => {
  try {
    let car = await Cars.findById(req.params.id);

    if (!car) return res.status(400).send('Car With given ID is not present'); //when id is not present id db

    return res.send(car); //everything is ok
  } catch (err) {
    return res.status(400).send('Invalid ID'); // format of id is not correct
  }
});

//update a record
router.put('/:id', validateCars, auth, admin, async (req, res) => {
  try {
    let car = await Cars.findById(req.params.id);

    car.name = req.body.name;
    car.model = req.body.model;
    car.used = req.body.used;
    car.price = req.body.price;

    await car.save();

    return res.send(car);
  } catch (err) {
    console.log(err);
  }
});

//update a record
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    let car = await Cars.findByIdAndDelete(req.params.id);

    return res.send(car);
  } catch (err) {
    console.log(err);
  }
});

//Insert a record
router.post('/', validateCars, auth, async (req, res) => {
  try {
    let car = new Cars();

    car.name = req.body.name;
    car.model = req.body.model;
    car.used = req.body.used;
    car.price = req.body.price;

    await car.save();

    return res.send(car);
  } catch (err) {
    console.log(err);
  }
});

router.get('/cart/:id', auth, async (req, res) => {
  try {
    let car = await Cars.findById(req.params.id);
    let cart = [];

    if (req.cookies.cart) cart = req.cookies.cart;

    cart.push(car);
    res.cookie('cart', cart);

    res.redirect('/buy');

    return res.send(car);
  } catch (err) {
    console.log(err);
  }
});

router.get('/cart/remove/:id', auth, async function (req, res, next) {
  let cart = [];

  if (req.cookies.cart) cart = req.cookies.cart;

  cart.splice(
    cart.findIndex((c) => c._id == req.params.id),
    1
  );

  res.cookie('cart', cart);
  res.redirect('/cart');
});

module.exports = router;
