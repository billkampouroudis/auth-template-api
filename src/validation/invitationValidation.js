import Joi from 'joi';
import { DEFAULT_LIST_VALIDATION } from '../constants/misc';
import rules from '../constants/validation';

export const createSchema = Joi.object({
  userId: Joi.number()
    .required(),

  email: Joi.string()
    .trim()
    .pattern(rules.emailRegex)
    .max(rules.defaultMaxLength)
    .required(),

  text: Joi.string()
    .trim()
    .max(200)
    .optional()
});

export const updateSchema = Joi.object({
  userId: Joi.number()
    .optional(),

  email: Joi.string()
    .trim()
    .pattern(rules.emailRegex)
    .max(rules.defaultMaxLength)
    .optional(),

  text: Joi.string()
    .trim()
    .max(200)
    .optional()
});

export const getSchema = Joi.object({
  invitationId: Joi.number()
    .required()
});

export const listSchema = Joi.object(DEFAULT_LIST_VALIDATION);

export const deleteSchema = Joi.object({
  invitationId: Joi.number()
    .required()
});
