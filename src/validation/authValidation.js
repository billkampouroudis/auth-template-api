import { is } from '@bill.kampouroudis/js-utils';
import Joi from 'joi';
import { createSchema as userCreateSchema } from './userValidation';

const { ALLOW_REGISTRATION_WITHOUT_INVITATION } = process.env;

export const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .required(),

  password: Joi.string()
    .required()
});

export const registrationSchema = userCreateSchema.concat(Joi.object({
  registrationCode: Joi.string()[is.truthy(ALLOW_REGISTRATION_WITHOUT_INVITATION) ? 'optional' : 'required']()
}));
