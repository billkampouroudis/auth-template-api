import STATUS from '../constants/statusCodes';
import { successResponse, errorResponse } from '../utils/response';
import { ForbiddenError } from '../constants/errors';
import {
  createSchema, getSchema, deleteSchema, listSchema,
  updateSchema, updatePasswordSchema
} from '../validation/userValidation';
import findError from '../utils/errorHandling';
import {
  createUserService, listUsersService, removeUserService,
  getUserService, updateUserService, updateUserPasswordService
} from '../services/userService';
import { paginationValues } from '../utils/pagination';
import { prepareListOptions } from '../utils/prepareOptions';

export async function createUser(req, res) {
  const userData = { ...req.body, avatar: req.file };

  try {
    await createSchema.validateAsync(userData);
    const user = await createUserService(userData);

    return successResponse(STATUS.HTTP_200_OK, user, res);
  } catch (error) {
    return errorResponse(findError(error), res);
  }
}

export async function updateUserPassword(req, res) {
  const userId = parseInt(req.params.userId, 10);

  try {
    await updatePasswordSchema.validateAsync(req.body);
    await updateUserPasswordService(userId, req.body);

    return successResponse(STATUS.HTTP_200_OK, {}, res);
  } catch (error) {
    return errorResponse(findError(error), res);
  }
}

export async function updateUser(req, res) {
  const userId = parseInt(req.params.userId, 10);

  try {
    await updateSchema.validateAsync(req.body);
    await updateUserService(userId, req.body);

    return successResponse(STATUS.HTTP_200_OK, {}, res);
  } catch (error) {
    return errorResponse(findError(error), res);
  }
}

export async function getUser(req, res) {
  try {
    const userId = parseInt(req.params.userId, 10);

    await getSchema.validateAsync({ userId });
    const user = await getUserService(userId);

    return successResponse(STATUS.HTTP_200_OK, user, res);
  } catch (error) {
    return errorResponse(findError(error), res);
  }
}

export async function listUsers(req, res) {
  try {
    const {
      page, pageSize, filters, order
    } = req.query;
    const options = prepareListOptions(page, pageSize, filters, order);

    await listSchema.validateAsync(options);
    const results = await listUsersService(options);

    return successResponse(
      STATUS.HTTP_200_OK,
      results.rows,
      res,
      paginationValues(options.page, options.pageSize, results.count)
    );
  } catch (error) {
    return errorResponse(findError(error), res);
  }
}

export async function removeUser(req, res) {
  try {
    const { authenticatedUser } = req;
    const userId = parseInt(req.params.userId, 10);

    await deleteSchema.validateAsync({ userId });

    // If requested user is not an admin and tries to delete someone else
    if (authenticatedUser.roleId !== 1
      && authenticatedUser.id !== userId) {
      throw new ForbiddenError();
    }

    removeUserService(userId);

    return successResponse(STATUS.HTTP_200_OK, {}, res);
  } catch (error) {
    return errorResponse(findError(error), res);
  }
}
