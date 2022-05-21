import STATUS from '../constants/statusCodes';
import { successResponse, errorResponse } from '../utils/response';
import findError from '../utils/errorHandling';
import { loginService } from '../services/authService';
import { loginSchema, registrationSchema } from '../validation/authValidation';
import { createUserService } from '../services/userService';

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    await loginSchema.validateAsync({ email, password });
    const result = await loginService(email, password);

    return successResponse(STATUS.HTTP_200_OK, result, res);
  } catch (error) {
    return errorResponse(findError(error), res);
  }
}

export async function register(req, res) {
  try {
    const {
      firstName, lastName, email, mobileNumber, password, avatar, registrationCode
    } = req.body;

    const userData = {
      firstName, lastName, email, mobileNumber, password, avatar
    };

    await registrationSchema.validateAsync({ ...userData, registrationCode });
    const user = await createUserService(userData, registrationCode, true);

    const token = await loginService(user.dataValues.email, user.dataValues.password, true);

    return successResponse(STATUS.HTTP_200_OK, { token }, res);
  } catch (error) {
    return errorResponse(findError(error), res);
  }
}
