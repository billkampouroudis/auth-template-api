import Joi from 'joi';
import { createSchema as userCreateSchema } from './userValidation';

export const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .required(),

  password: Joi.string()
    .required()
});

export const registrationSchema = userCreateSchema;
