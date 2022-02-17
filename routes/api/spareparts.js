var router = require('express').Router();

var { Spareparts } = require('../../models/spareparts');
const validateSpareparts = require('../../middlewares/validateSpareparts');
var auth = require('../../middlewares/auth');
var admin = require('../../middlewares/admin');

//get spareparts
router.get('/', async (req, res) => {
  try {
    let page = Number(req.query.page ? req.query.page : 1);
    let perPage = Number(req.query.perPage ? req.query.perPage : 10);
    let skipRecords = perPage * (page - 1);

    let spareparts = await Spareparts.find().skip(skipRecords).limit(perPage);

    return res.send(spareparts);
  } catch (err) {
    console.log(err);
  }
});

//get single spareparts
router.get('/:id', async (req, res) => {
  try {
    let sparepart = await Spareparts.findById(req.params.id);

    if (!sparepart)
      return res.status(400).send('Sparepart With given ID is not present'); //when id is not present id db

    return res.send(sparepart); //everything is ok
  } catch (err) {
    return res.status(400).send('Invalid ID'); // format of id is not correct
  }
});

//update a record
router.put('/:id', validateSpareparts, auth, admin, async (req, res) => {
  try {
    let sparepart = await Spareparts.findById(req.params.id);
    sparepart.name = req.body.name;
    sparepart.company = req.body.company;
    sparepart.model = req.body.model;
    sparepart.price = req.body.price;

    await sparepart.save();

    return res.send(sparepart);
  } catch (err) {
    console.log(err);
  }
});

//update a record
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    let sparepart = await Spareparts.findByIdAndDelete(req.params.id);

    return res.send(sparepart);
  } catch (err) {
    console.log(err);
  }
});

//Insert a record
router.post('/', validateSpareparts, auth, async (req, res) => {
  try {
    let sparepart = new Spareparts();
    sparepart.name = req.body.name;
    sparepart.company = req.body.company;
    sparepart.model = req.body.model;
    sparepart.price = req.body.price;

    await sparepart.save();

    return res.send(sparepart);
  } catch (err) {
    console.log(err);
  }
});

router.get('/cart/:id', auth, async (req, res) => {
  try {
    let sparepart = await Spareparts.findById(req.params.id);
    let cart = [];

    if (req.cookies.cart) cart = req.cookies.cart;

    cart.push(sparepart);
    res.cookie('cart', cart);
    res.redirect('/buy');

    return res.send(sparepart);
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
