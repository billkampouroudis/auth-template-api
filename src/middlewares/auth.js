import passport from 'passport';
import { UnauthorizedError } from '../constants/errors';

function auth(req, res, next) {
  // eslint-disable-next-line no-unused-vars
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (user) {
      req.authenticatedUser = user;
      return next();
    }

    return next(new UnauthorizedError('Απαιτείται σύνδεση στην εφαρμογή'));
  })(req, res, next);
}

export default auth;
