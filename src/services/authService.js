import { sign } from 'jsonwebtoken';
import { models } from '../models';
import { UnauthorizedError } from '../constants/errors';

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
