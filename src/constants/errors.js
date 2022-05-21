/* eslint-disable max-classes-per-file */
import STATUS from './statusCodes';

/**
 * An internal server error is an error on the web server you’re
 * trying to access. That server is misconfigured in some way
 * that prevents it from responding properly to what you’re
 * asking it to do.
 */
export class InternalServerError extends Error {
  constructor(message) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = this.constructor.name;
    this.status = STATUS.HTTP_500_INTERNAL_SERVER_ERROR;
    this.message = message || '';
  }
}

/**
 * The 400 Bad Request Error indicates that the server was unable
 * to process therequest sent by the client due to invalid syntax.
 */
export class BadRequestError extends Error {
  constructor(message) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = this.constructor.name;
    this.status = STATUS.HTTP_400_BAD_REQUEST;
    this.message = message || '';
  }
}

/**
 * The 404 Not Found Error Indicates that the browser was able to
 * communicate with a given server, but the server could not find what
 * was requested.
 */
export class NotFoundError extends Error {
  constructor(message) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = this.constructor.name;
    this.status = STATUS.HTTP_404_NOT_FOUND;
    this.message = message || '';
  }
}

/**
 * The 409 status code (Conflict) indicates that the request could
 * not be processed because of conflict in the request, such as the
 * requested resource is not in the expected state, or the result of
 * processing the request would create a conflict within the resource
 */
export class ConflictError extends Error {
  constructor(message) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = this.constructor.name;
    this.status = STATUS.HTTP_409_CONFLICT;
    this.message = message || '';
  }
}

/**
 * The 422 Unprocessable Entity response status code indicates that the
 * server understands the content type of the request entity, and the
 * syntax of the request entity is correct, but it was unable to process
 * the contained instructions
 */
export class UnprocessableEntityError extends Error {
  constructor(message) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = this.constructor.name;
    this.status = STATUS.HTTP_422_UNPROCESSABLE_ENTITY;
    this.message = message || '';
  }
}

/**
 * The 401 Unauthorized client error status response code indicates that
 * the client request has not been completed because it lacks valid
 * authentication credentials for the requested resource
 */
export class UnauthorizedError extends Error {
  constructor(message) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = this.constructor.name;
    this.status = STATUS.HTTP_401_UNAUTHORIZED;
    this.message = message || '';
  }
}

/**
 * The 403 Forbidden client error status response code indicates that
 * the server understands the request but refuses to authorize it.
 */
export class ForbiddenError extends Error {
  constructor(message) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = this.constructor.name;
    this.status = STATUS.HTTP_403_FORBIDDEN;
    this.message = message || '';
  }
}
