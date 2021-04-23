const mocha = require('mocha');
const assert = require('assert');
const bcrypt = require('bcrypt');

const dbConnection = require('../src/models/dbConnection');
const user = require('../src/models/user');
const userController = require('../src/controllers/userController')

describe ('User Controller Tests', function(done){
    before(function(done){
        return dbConnection.Connect(done);
    });

    
    it('Register', function(done){
        const newUser = new user({
            username: 'newbie123',
            password: 'asdfasdf'
        }); 

        assert(userController.Register(newUser));
        done();
    });
 
    it('Register Duplicate User', function(done){
        const newUser = new user({
            username: 'abcd',
            password: 'zxcvzxcv'
        }); 

        assert(!userController.Register(newUser));
        done();
    });

    
    it('Successful Login', function(done){
        var username = 'abcd';
        var password = '12345678';

        assert(userController.Login(username,password));

        done();
    });

    it('Bad Password', function(done){
        var username = 'abcd';
        var password = 'asdfdfsdf';

        assert(userController.Login(username,password));

        done();
    });

    it('Invalid User', function(done){
        var username = 'user123';
        var password = '12345678';

        assert(userController.Login(username,password));

        done();
    });

 /*   after(function(){
        return dbConnection.Disconnect();
    })*/


});