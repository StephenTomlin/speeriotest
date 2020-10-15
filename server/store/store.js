import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDB,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

export default {

    /*
    * USER MANAGEMENT
    */
    // get user by database id
    getUserById: async (id) => {
        const res = await pool.query(`SELECT * FROM users WHERE UserID = ${id};`);
        return res.rows[0];
    },

    // get user by username
    getUserByUsername: async (username) => {
        const res = await pool.query(`SELECT * FROM users WHERE Username = '${username}';`);
        return res.rows[0];
    },

    // create a new user -- used on signup
    addUser: async (user) => {
        const res = await pool.query(`INSERT INTO users (Username, PasswordHashed) values ('${user.username}', '${user.password}');`);
        return res;
    },

    deleteUser: async (username) => {
        const res = await pool.query(`DELETE FROM users WHERE Username = '${username}';`)
        return res;
    },



    /** 
     * TWEET MANAGEMENT 
     * */

     // Creates a tweet
    createTweet: async (userid, tweet) => {
        const res = await pool.query(`INSERT INTO tweets (UserID, TweetText) values (${userid}, ${tweet})`);
        return res;
    },

    // gets all tweets
    getTweets: async () => {
        const res = await pool.query('SELECT * FROM tweets')
        return res.rows;
    },

    // gets a single tweet
    getTweetByID: async (id) => {
        const res = await pool.query(`SELECT * FROM tweets WHERE tweetid = ${id};`);
        return res.rows[0]
    },

    // updates a tweet
    updateTweet: async (tweetID, tweet) => {
        const res = await pool.query(`UPDATE tweets SET TweetText = '${tweet}' WHERE TweetID = ${tweetID};`)
    },

    deleteTweet: async (tweetID) => {
        const res = await pool.query(`DELETE FROM TWEETS WHERE tweetid = ${tweetID};`)
    }
}
