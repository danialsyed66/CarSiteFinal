var mongoose = require("mongoose");

var schema = mongoose.Schema({
    name: String,
    company: String,
    model: Number,
    price: Number
})

const spareparts = mongoose.model("spareparts", schema);

module.exports = spareparts;