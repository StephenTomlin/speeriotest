// import assert from 'assert';
import request from 'supertest';
import server from '../app.js'
import store from '../server/store/store.js';

describe('Authenication routes should work', () => {

    // create a user that will already exist in the database
    // and also remove the user that doesnt already exist
    beforeEach(() => {
        store.deleteUser("TestUser")
        request(server)
            .post('/auth/signup')
            .send({"username": "ExistingUser", "password": "password"})
    });

    //remove the testuser
    afterEach(() =>  {
        store.deleteUser("TestUser")
    });

    // user should be able to send in a username and password and get signed up. aslong as its unique
    describe('User should be able to sign up', () => {
        it('responds with 200', function(done) {
            request(server)
            .post('/auth/signup')
            .send({ "username": "TestUser", "password": "password"})
            .expect(200, done)
        })
    });

    // user should be able to login
    describe('user should be able to login', () => {
        it ('responds with 200', function(done) {
            request(server)
            .post('/auth/signin')
            .send({ "username": "TestUser", "password": "password"})
            .expect(200, done)
        })
    })

    // user should not be able to create an account that already exists
    describe('Username should not be able to use a username that already exists', () => {
        it('responds with 500', function(done) {
            request(server)
            .post('/auth/signup')
            .send({ "username": "ExistingUser", "password": "password"})
            .expect(500, done)
        })
    });
})