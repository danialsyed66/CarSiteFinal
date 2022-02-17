var mongoose = require('mongoose');
const Joi = require('@hapi/joi');

var schema = mongoose.Schema({
  name: String,
  price: Number,
});

const Services = mongoose.model('Services', schema);

function validateServices(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    price: Joi.number().min(0).required(),
  });

  return schema.validate(data, { abortEarly: false });
}

module.exports.Services = Services;
module.exports.validate = validateServices;
