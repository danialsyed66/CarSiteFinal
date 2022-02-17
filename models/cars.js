var mongoose = require('mongoose');
const Joi = require('@hapi/joi');

var schema = mongoose.Schema({
  name: String,
  model: Number,
  used: Boolean,
  price: Number,
});

const Cars = mongoose.model('Cars', schema);

function validateCars(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    model: Joi.number().min(1700).max(3000).required(),
    used: Joi.boolean().required(),
    price: Joi.number().min(0).required(),
  });

  return schema.validate(data, { abortEarly: false });
}

module.exports.Cars = Cars;
module.exports.validate = validateCars;
