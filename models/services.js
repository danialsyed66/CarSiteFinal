var mongoose = require("mongoose");

var schema = mongoose.Schema({
    name: String,
    price: Number
})

const services = mongoose.model("services", schema);

module.exports = services;