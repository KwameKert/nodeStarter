import passport from 'passport';
import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';
import constants from './constants';
import {Users} from '../db/models';

export const setupPassport = (app) => {

    const jwtOpts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: constants.JWT_SECRET,
    };
    const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
        try {
            const user = await Users.findByPk(payload.id);

            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (e) {
            console.error("oops");
            return done(e, false);
        }
    });

    passport.use(jwtStrategy);

    app.use(passport.initialize());
};

export const authJwt = passport.authenticate('jwt', {session: false});
 