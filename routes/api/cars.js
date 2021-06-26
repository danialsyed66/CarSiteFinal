const express = require("express");
let router = express.Router();
const validateCars = require("../../middlewares/validateCars");
var { Cars } = require("../../models/cars");
var auth = require("../../middlewares/auth");
var admin = require("../../middlewares/admin");

//get cars
router.get("/", auth, async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let cars = await Cars.find().skip(skipRecords).limit(perPage);
  console.log("hhh");
  console.log(message);
  console.log(req.session);
  return res.send(cars);
});
//get single cars
router.get("/:id", async (req, res) => {
  try {
    let car = await Cars.findById(req.params.id);
    if (!car) return res.status(400).send("Car With given ID is not present"); //when id is not present id db
    return res.send(car); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});
//update a record
router.put("/:id", validateCars, async (req, res) => {
  let car = await Cars.findById(req.params.id);
  car.name = req.body.name;
  car.model = req.body.model;
  car.used = req.body.used;
  car.price = req.body.price;
  await car.save();
  return res.send(car);
});
//update a record
router.delete("/:id", auth, admin, async (req, res) => {
  let car = await Cars.findByIdAndDelete(req.params.id);
  return res.send(car);
});
//Insert a record
router.post("/", validateCars, async (req, res) => {
  let car = new Cars();
  car.name = req.body.name;
  car.model = req.body.model;
  car.used = req.body.used;
  car.price = req.body.price;
  await car.save();
  return res.send(car);
});
module.exports = router;
