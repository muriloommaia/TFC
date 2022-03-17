import Joi = require('joi');
import { MessagesStatus } from '../../utils';

export const WITHOUT_DEFAULT = 1;

export const schemaLogin = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).messages({
  'any.required': MessagesStatus.allFieldsFilled,
  'string.email': MessagesStatus.incorrectEmail,
  'string.empty': MessagesStatus.allFieldsFilled,
  'string.min': MessagesStatus.incorrectPassword,
});
