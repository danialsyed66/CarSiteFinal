var mongoose = require('mongoose');
const Joi = require('@hapi/joi');

var schema = mongoose.Schema({
  name: String,
  company: String,
  model: Number,
  price: Number,
});

const Spareparts = mongoose.model('Spareparts', schema);

function validateSpareparts(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    company: Joi.string().min(3).max(20).required(),
    model: Joi.number().min(1700).required(),
    price: Joi.number().min(0).required(),
  });

  return schema.validate(data, { abortEarly: false });
}

module.exports.Spareparts = Spareparts;
module.exports.validate = validateSpareparts;
