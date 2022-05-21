import { models } from '../models';
import { BadRequestError, ForbiddenError, UnauthorizedError } from '../constants/errors';
import { addPagination } from '../utils/pagination';
import { authSerializer } from '../serializers/AuthSerializer';
// import mailer from '../utils/promiseMailer';

/**
 * Creates a user with the given data
 * @param {object} userData
 * @param {string} registrationCode The code that a user needs in order to be able to register
 * @param {boolean} safe Indicates if the return value is safe to contain the user's password
 * @returns {object} The newly created user
 */
export async function createUserService(userData, registrationCode, safe) {
  const { User, Invitation } = models;

  const isRegistrationCodeCorrect = !!await Invitation.findOne({ where: { email: userData.email, registrationCode } });
  if (!isRegistrationCodeCorrect) {
    throw new UnauthorizedError();
  }

  const user = await User.create(userData);

  return Promise.resolve(safe ? user : authSerializer(user.toJSON()));
}

/**
 * Updates a user with the given data
 * @param {number} userId
 * @param {object} userData
 * @returns {object} The updated user
 */
export async function updateUserService(userId, userData) {
  const { User } = models;

  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    throw new BadRequestError();
  }

  for (const key of Object.keys(userData)) {
    user[key] = userData[key];
  }

  user.save();

  return Promise.resolve(authSerializer(user.toJSON()));
}

/**
 * Updates a user's password with the new one
 * @param {number} userId
 * @param {object} userData
 * @returns {object} The updated user
 */
export async function updateUserPasswordService(userId, userData) {
  const { User } = models;
  const { oldPassword, newPassword } = userData;

  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    throw new BadRequestError();
  }

  if (newPassword) {
    if (user.validPassword(oldPassword)) {
      user.password = user.hashPassword(newPassword, user.salt);
    } else {
      throw new ForbiddenError();
    }
  }

  user.save();

  return Promise.resolve(authSerializer(user.toJSON()));
}

/**
 * Finds a user based on the given user id
 * @param {number} userId
 * @param {boolean} safe Indicates if the return value is safe to contain the user's password
 * @returns {Promise<Array<object>>} The users that meet the requested criteria
 */
export async function getUserService(userId, safe) {
  const { User } = models;

  let users = {};
  try {
    users = await User.findOne({
      attributes: { exclude: safe ? [] : ['password', 'salt'] },
      where: { id: userId },
      subQuery: false
    });
  } catch (err) {
    throw new BadRequestError();
  }

  return Promise.resolve(users);
}

/**
 * Finds the users based on the given filters
 * @param {object} options
 * @param {number} options.page The requested page
 * @param {number} options.pageSize The requested size of each page
 * @param {object} options.filters The requested search filters
 * @param {array} options.order The requested order of the results
 * @returns {Promise<Array<object>>} The users that meet the requested criteria
 */
export async function listUsersService(options) {
  const { User } = models;
  const {
    page, pageSize, filters, order
  } = options;

  const users = await User.findAndCountAll({
    attributes: { exclude: ['password', 'salt'] },
    where: filters,
    order: order || [],
    distinct: true,
    subQuery: false,
    ...addPagination(page, pageSize)
  });

  return Promise.resolve(users);
}

export async function removeUserService(userId) {
  const { User } = models;

  try {
    User.destroy({
      where: { id: userId }
    });
  } catch (err) {
    throw new BadRequestError(err);
  }

  return Promise.resolve();
}
