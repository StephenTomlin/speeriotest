import store from '../store/store.js';
import passportLocal from 'passport-local'
import bcryptjs  from 'bcryptjs';
import jsonwebtoken  from'jsonwebtoken';
const LocalStrategy = passportLocal.Strategy;
import config from '../../config.js';


const compare = bcryptjs.compare;


export default () => {
    return new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, async function(req, username, password, done) {
        const user = await store.getUserByUsername(username.trim());

        // if the user exists; check to see if the password is correct
        if (user) {
            const valid = await compare(password.trim(), user.passwordhashed)

            // if the password doesnt match
            if (!valid) {
                return done(null, false, {'loginMessage': ' Oops! Wrong Password'});
            } else {
                return done(null, jsonwebtoken.sign({sub: user.userid}, config.jwtSecret), {
                    username: user.username,
                    password: user.passwordhashed
                })
            }
        } else {
            return done(null, false, {'loginMessage': 'No user found.'});
        }
    })
}