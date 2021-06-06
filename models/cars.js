var mongoose = require("mongoose");

var schema = mongoose.Schema({
    name: String,
    model: Number,
    used: Boolean,
    price: Number
})

const cars = mongoose.model("cars", schema);

module.exports = cars;