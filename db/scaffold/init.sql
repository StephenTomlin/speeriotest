----------------------------------------------------
-- run these commands on a local postgresql server--
----------------------------------------------------


-- Create database for the tweet app called tweetdb
CREATE DATABASE tweetdb;

-- Create user for the tweetapi
CREATE USER tweetapi with password 'thetweeterpassword';

-- Using tweetdb lets create a bunch of tables
USE tweetdb;

-- Create user table with an auto incrementing userid.
-- this table contains a username and hashedpassword for the user
CREATE TABLE users (
    UserID SERIAL PRIMARY KEY,
    Username VarChar(100) NOT NULL,
    PasswordHashed VarChar(100)
);


-- grant necessary priviledges to tweetapi
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO tweetapi;
GRANT USAGE, SELECT ON SEQUENCE users_userid_seq TO tweetapi;

CREATE TABLE tweets (
    TweetID Serial PRIMARY Key,
    UserID Serial,
    TweetText varchar(280),
    CONSTRAINT fk_User
        FOREIGN kEY (UserID)
            REFERENCES Users(UserID)
)
