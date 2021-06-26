const express = require("express");
let router = express.Router();
const validateSpareparts = require("../../middlewares/validateSpareparts");
var { Spareparts } = require("../../models/spareparts");
var auth = require("../../middlewares/auth");
var admin = require("../../middlewares/admin");

//get spareparts
router.get("/", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let spareparts = await Spareparts.find().skip(skipRecords).limit(perPage);
  return res.send(spareparts);
});
//get single spareparts
router.get("/:id", async (req, res) => {
  try {
    let car = await Spareparts.findById(req.params.id);
    if (!car) return res.status(400).send("Car With given ID is not present"); //when id is not present id db
    return res.send(car); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});
//update a record
router.put("/:id", validateSpareparts, auth, admin, async (req, res) => {
  let car = await Spareparts.findById(req.params.id);
  car.name = req.body.name;
  car.company = req.body.company;
  car.model = req.body.model;
  car.price = req.body.price;
  await car.save();
  return res.send(car);
});
//update a record
router.delete("/:id", auth, admin, async (req, res) => {
  let car = await Spareparts.findByIdAndDelete(req.params.id);
  return res.send(car);
});
//Insert a record
router.post("/", validateSpareparts, auth, async (req, res) => {
  let car = new Spareparts();
  car.name = req.body.name;
  car.company = req.body.company;
  car.model = req.body.model;
  car.price = req.body.price;
  await car.save();
  return res.send(car);
});

router.get("/cart/:id", auth, async (req, res) => {
  let car = await Spareparts.findById(req.params.id);
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.push(car);
  res.cookie("cart", cart);
  // return res.send(car);
  res.redirect("/buy");
});
router.get("/cart/remove/:id", auth, async function (req, res, next) {
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.splice(
    cart.findIndex((c) => c._id == req.params.id),
    1
  );
  res.cookie("cart", cart);
  res.redirect("/cart");
});

module.exports = router;
