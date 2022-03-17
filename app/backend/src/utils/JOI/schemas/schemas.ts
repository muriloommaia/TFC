import Joi = require('joi');

export const WITHOUT_DEFAULT = 1;

export const schemaLogin = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});