import store from '../store/store.js';
import passportLocal from 'passport-local'
import bcryptjs  from 'bcryptjs';


const LocalStrategy = passportLocal.Strategy;
const genSalt = bcryptjs.genSalt;
const hash = bcryptjs.hash;

export default () => {
    return new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, async function (req, username, password, done) {
        // check to see if email already exists...
        const user = await store.getUserByUsername(username.trim());
        if (user) {
            return done(null, false, {'signupMessage': 'That username is already taken.'})
        } else {
            // if user does not exist; create.

            //generate salt
            const salt = await genSalt();
            try {
                // hash password with salt
                password = await hash(password, salt)
                //store new user
                await store.addUser({ username, password });
                done(null, true, {"message": 'Successful Signup'});
            } catch (err) {
                console.error(err);
                done(null);
            }
        }
    })
}