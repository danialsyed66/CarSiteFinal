var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');

var userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: 'user',
  },
});

userSchema.methods.generateHashedPassword = async function () {
  try {
    let salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    console.log(err);
  }
};

var User = mongoose.model('User', userSchema);

function validateUser(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().min(6).max(30).required(),
    password: Joi.string().min(6).max(20).required(),
  });

  return schema.validate(data, { abortEarly: false });
}

function validateUserLogin(data) {
  const schema = Joi.object({
    email: Joi.string().email().min(6).max(30).required(),
    password: Joi.string().min(6).max(20).required(),
  });

  return schema.validate(data, { abortEarly: false });
}

module.exports.User = User;
module.exports.validate = validateUser; //for sign up
module.exports.validateUserLogin = validateUserLogin; // for login
