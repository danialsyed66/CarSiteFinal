const express = require("express");
let router = express.Router();
const validateServices = require("../../middlewares/validateServices");
var { Services } = require("../../models/services");
var auth = require("../../middlewares/auth");
var admin = require("../../middlewares/admin");

//get services
router.get("/", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let services = await Services.find().skip(skipRecords).limit(perPage);
  return res.send(services);
});
//get single services
router.get("/:id", async (req, res) => {
  try {
    let service = await Services.findById(req.params.id);
    if (!service)
      return res.status(400).send("Service With given ID is not present"); //when id is not present id db
    return res.send(service); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});
//update a record
router.put("/:id", validateServices, auth, admin, async (req, res) => {
  let service = await Services.findById(req.params.id);
  service.name = req.body.name;
  service.price = req.body.price;
  await service.save();
  return res.send(service);
});
//update a record
router.delete("/:id", auth, admin, async (req, res) => {
  let service = await Services.findByIdAndDelete(req.params.id);
  return res.send(service);
});
//Insert a record
router.post("/", validateServices, auth, admin, async (req, res) => {
  let service = new Services();
  service.name = req.body.name;
  service.price = req.body.price;
  await service.save();
  return res.send(service);
});

router.get("/cart/:id", auth, async (req, res) => {
  let service = await Services.findById(req.params.id);
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.push(service);
  res.cookie("cart", cart);
  // return res.send(service);
  res.redirect("/services");
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
