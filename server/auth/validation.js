const Joi = require("joi");

async function registerValidation(data) {
  const userJoi = Joi.object({
    userName: Joi.string().min(4).max(255),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(7).required(),
  });

  return userJoi.validateAsync(data);
}

module.exports.registerValidation = registerValidation;

async function loginValidation(data) {
  const userJoi = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(7).required(),
  });

  return userJoi.validateAsync(data);
}

module.exports.loginValidation = loginValidation;
