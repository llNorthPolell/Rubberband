const mocha = require('mocha');
const assert = require('assert');
const bcrypt = require('bcrypt');

const dbConnection = require('../src/models/dbConnection');
const user = require('../src/models/user');
const userController = require('../src/controllers/userController')

describe ('User Controller Tests', (done)=>{
    before((done)=>{
        return dbConnection.Connect(done);
    });

 /*   
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
*/
    
    it('Successful Login', (done) => {
        let username = 'abcd';
        let password = '12345678';

        userController.Login(username, password)
            .then((result)=> {
                console.log("Successful login result: "+ result.data);
                assert(result.status==200);
                assert(result.data!=null);
            }).then(done,done);           
    });

    it('Bad Password', (done) => {
        let username = 'abcd';
        let password = 'asdfdfsdf';

        userController.Login(username, password)
            .then((result)=> {
                console.log("Bad Password result: "+ result.data);
                assert(result.status==500);
                assert(result.data==null);
            }).then(done,done);           
    });


    it('Invalid User', (done) => {
        let username = 'user123';
        let password = '12345678';

        userController.Login(username, password)
            .then((result)=> {
                console.log("Invalid User result: "+ result.data);
                assert(result.status==500);
                assert(result.data==null);
            }).then(done,done);           
    });

 /*   after(function(){
        return dbConnection.Disconnect();
    })*/


});