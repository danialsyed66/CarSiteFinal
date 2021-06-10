const express = require("express");
let router = express.Router();
const validateServices = require("../../middlewares/validateServices");
var { Services } = require("../../models/services");

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
    let car = await Services.findById(req.params.id);
    if (!car) return res.status(400).send("Car With given ID is not present"); //when id is not present id db
    return res.send(car); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});
//update a record
router.put("/:id", validateServices, async (req, res) => {
  let car = await Services.findById(req.params.id);
  car.name = req.body.name;
  car.price = req.body.price;
  await car.save();
  return res.send(car);
});
//update a record
router.delete("/:id", async (req, res) => {
  let car = await Services.findByIdAndDelete(req.params.id);
  return res.send(car);
});
//Insert a record
router.post("/", validateServices, async (req, res) => {
  let car = new Services();
  car.name = req.body.name;
  car.price = req.body.price;
  await car.save();
  return res.send(car);
});
module.exports = router;
