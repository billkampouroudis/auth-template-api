import Joi from 'joi';
import { DEFAULT_LIST_VALIDATION } from '../constants/misc';
import rules from '../constants/validation';

export const createSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .pattern(rules.nameRegex)
    .max(45)
    .required(),

  lastName: Joi.string()
    .trim()
    .pattern(rules.nameRegex)
    .max(45)
    .required(),

  email: Joi.string()
    .trim()
    .pattern(rules.emailRegex)
    .max(rules.defaultMaxLength)
    .required(),

  mobileNumber: Joi.string()
    .trim()
    .pattern(rules.phoneRegex)
    .optional(),

  password: Joi.string()
    .min(rules.defaultPasswordLength)
    .required(),

  avatar: Joi.object({
    fieldname: Joi.string(),
    originalname: Joi.string(),
    encoding: Joi.string(),
    mimetype: Joi.string().valid(...rules.defaultFileTypes),
    buffer: Joi.any(),
    size: Joi.number().max(rules.defaultMaxFileSize)
  }).optional()
});

export const updateSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .pattern(rules.nameRegex)
    .max(45)
    .optional(),

  lastName: Joi.string()
    .trim()
    .pattern(rules.nameRegex)
    .max(45)
    .optional(),

  email: Joi.string()
    .trim()
    .pattern(rules.emailRegex)
    .max(rules.defaultMaxLength)
    .optional(),

  mobileNumber: Joi.string()
    .trim()
    .pattern(rules.phoneRegex)
    .optional(),

  avatar: Joi.object({
    fieldname: Joi.string(),
    originalname: Joi.string(),
    encoding: Joi.string(),
    mimetype: Joi.string().valid(...rules.defaultFileTypes),
    buffer: Joi.any(),
    size: Joi.number().max(rules.defaultMaxFileSize)
  }).optional()
});

export const updatePasswordSchema = Joi.object({
  oldPassword: Joi.string()
    .min(rules.defaultPasswordLength)
    .required(),

  newPassword: Joi.string()
    .min(rules.defaultPasswordLength)
    .required()
});

export const getSchema = Joi.object({
  userId: Joi.number()
    .required()
});

export const listSchema = Joi.object(DEFAULT_LIST_VALIDATION);

export const deleteSchema = Joi.object({
  userId: Joi.number()
    .required()
});
