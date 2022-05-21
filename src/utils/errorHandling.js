import { object } from '@bill.kampouroudis/js-utils';
import {
  InternalServerError,
  BadRequestError,
  UnprocessableEntityError
} from '../constants/errors';

const findError = (error) => {
  const { name, errors, details } = error;
  switch (name) {
    case 'SequelizeUniqueConstraintError':
      return new UnprocessableEntityError(
        object.get(() => errors[0].message, '')
      );
    case 'SequelizeValidationError':
    case 'ValidationError':
      return new BadRequestError(object.get(() => details[0].message, ''));
    case 'BadRequestError':
    case 'UnauthorizedError':
    case 'NotFoundError':
    case 'ConflictError':
    case 'ForbiddenError':
    case 'InternalServerError':
    case 'UnprocessableEntityError':
      return error;
    case 'Error': return new UnprocessableEntityError(process.env.NODE_ENV === 'development' ? error.message : '');
    default:
      return new InternalServerError(process.env.NODE_ENV === 'development' ? error.message : '');
  }
};

export default findError;
