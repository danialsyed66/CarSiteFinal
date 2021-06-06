var mongoose = require("mongoose");

var schema = mongoose.Schema({
    name: String,
    password: String
})

const users = mongoose.model("cars", schema);

module.exports = users;