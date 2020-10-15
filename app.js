import express from 'express';
import bodyparser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import cors from 'cors';
import passportSignup from './server/passport/passportSignup.js';
import passportLogin from './server/passport/passportLogin.js';
import checkAuth from './server/middleware/authCheck.js';
import authRoutes from './server/routes/auth/router.js';
import tweetRoutes from './server/routes/tweet/router.js'
import store from './server/store/store.js';
import socket from 'socket.io';


const app = express();

// disable powered by header
app.disable('x-powered-by');

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
// use morgan dev logger
app.use(morgan('dev'));




/*
    Configure Passport
*/
app.use(passport.initialize());
passport.serializeUser(function(user, done) {
    done(null, user.UserID);
});
passport.deserializeUser(async function(id, done) {
    const user = await store.getUserById(id);
    done(user);
});
passport.use('local-signup', passportSignup());
passport.use('local-login', passportLogin());



/**
 * Routes and Responses
 */
app.use('/auth', authRoutes);
app.use(checkAuth);
//protected routes below
app.use('/api', tweetRoutes);



/**
 * Start the server
 */
app.set('port', (process.env.PORT || 8000));
const server = app.listen(app.get('port'), () => console.log(`server is running on port ${app.get('port')}`));

/**
 * below is for messeging purposes
 */
const io = socket(server);
const activeUsers = new Set();

io.on("connection", socket => {
    socket.on("new user", data => {
        socket.userId = data;
        activeUsers.add(data);
        io.emit("new user", [...activeUsers])
    })

    socket.on("disconnect", () => {
        activeUsers.delete(socket.userId);
        io.emit("user disconnected", socket.userId)
    })

    socket.on("chat message", data => {
        io.emit("chat message", data);
    });
      
    socket.on("typing", data => {
        socket.broadcast.emit("typing", data);
    });
})
// export app for testing purposes
export default app;