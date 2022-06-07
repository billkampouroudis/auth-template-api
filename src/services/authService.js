import { sign } from 'jsonwebtoken';
import { models } from '../models';
import { ForbiddenError, UnauthorizedError } from '../constants/errors';
import { createUserService } from './userService';
import { updateInvitationService } from './invitationService';

/**
 * Checks if there is a user with the given username and password
 * and returns the signed JWT when it is true.
 * @param {string} email
 * @param {string} password
 * @param {boolean} encryptedPassword Indicates if the password is encrypted or not
 * @returns {object} The signed JWT
 */
export async function loginService(email, password, encryptedPassword) {
  const { User } = models;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new UnauthorizedError();
  }

  if (
    (encryptedPassword && user.password !== password)
    || (!encryptedPassword && !user.validPassword(password))) {
    throw new UnauthorizedError();
  }

  const token = sign(
    {
      userId: user.id
    },

    process.env.JWT_SECRET,

    {
      expiresIn: '30 days'
    }
  );

  return Promise.resolve({ token, user });
}

/**
 * Creates the new user and if there is an invitation it changes it's status.
 * @param {object} userData
 * @param {string} registrationCode
 * @returns {object} The signed JWT and the created user
 */
export async function registerService(userData, registrationCode) {
  const { Invitation } = models;
  let invitation;

  if (registrationCode) {
    invitation = await Invitation.findOne({
      where: {
        email: userData.email,
        registrationCode,
        status: 0
      }
    });

    // If no invitation found, there is no invitation or the user has already used it and it can not be used again
    if (!invitation) {
      throw new ForbiddenError();
    }
  }

  const user = await createUserService(userData, true);

  if (invitation) {
    await updateInvitationService(invitation.id, { status: 1 });
  }

  return Promise.resolve(await loginService(user.dataValues.email, user.dataValues.password, true));
}
