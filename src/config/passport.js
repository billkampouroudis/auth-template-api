import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { models } from '../models';

const JWTStrategy = Strategy;
const ExtractJWT = ExtractJwt;

const options = {};
options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET || 'secret_key';

const initPassport = () => passport.use(
  new JWTStrategy(options, (async (jwtPayload, done) => {
    const { User } = models;

    const user = await User.findOne({
      attributes: { exclude: ['password', 'salt'] },
      where: { id: jwtPayload.userId || -1 }
    });

    if (user) {
      return done(null, user);
    }

    return done(true, false);
  }))
);

export default initPassport;
