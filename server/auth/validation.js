const Joi = require("joi");
const { func } = require("joi");

async function registerValidation(data) {
  const userJoi = Joi.object({
    userName: Joi.string().min(4).max(255),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(7).required(),
  });

  return userJoi.validateAsync(data);
}

module.exports.registerValidation = registerValidation;
