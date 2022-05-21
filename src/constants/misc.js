import Joi from 'joi';

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_USER_PASSWORD = 'fQbqyEIY31QjCa5tat4Y';

export const DEFAULT_LIST_VALIDATION = {
  page: Joi
    .number()
    .required(),
  pageSize: Joi
    .number()
    .required(),
  filters: Joi
    .object()
    .optional(),
  order: Joi
    .array()
    .optional(),
  attributes: Joi
    .alternatives(
      Joi.object(),
      Joi.array()
    ).optional(),
  raw: Joi
    .boolean()
    .optional()
};
