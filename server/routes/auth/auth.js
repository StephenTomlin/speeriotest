import passport from 'passport';

export function signup(req, res, next) {
    return passport.authenticate('local-signup', (err, success, message) => {
        if (!success) {
            return res.status(500).json({
                success: false,
                payload: {
                    err: message.signupMessage
                }
            })
        }
        return res.status(200).json({ success: true, payload: { success } });
    })(req, res, next);
}

export function signin(req, res, next) {
    return passport.authenticate('local-login', (err, token, user) => {
        if (err !== null) {
            return res.status(500).json({
                success: false,
                payload: {
                    err
                }
            })
        }
        return res.status(200).json({
            success: true,
            payload: {
                token,
                user,
            }
        });
    })(req, res, next);
}