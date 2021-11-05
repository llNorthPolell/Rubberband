const mocha = require('mocha');
const assert = require('assert');
const bcrypt = require('bcrypt');

const dbConnection = require('../src/models/dbConnection');
const user = require('../src/models/user');
const userController = require('../src/controllers/userController')

describe ('User Controller Tests', (done)=>{
    before((done)=>{
        dbConnection.Connect().then(done,done);
    });

  
    it('Successful Registration', function(done){
        const newUser = new user({
            username: 'newUser',
            password: 'asdfasdf',
            email: 'newUser@abc.com'
        }); 

        userController.Register(newUser)
            .then((result)=>{
                console.log("Successful Registration result: "+ result.data);
                console.log(result.message);
                assert(result.status==200);   
        }).then(done,done);    


    });


    it('Duplicate User', function(done){
        const newUser = new user({
            username: 'abcd',
            password: '12343',
            email: 'sdfdfd@abc.com'
        }); 

        userController.Register(newUser)
            .then((result)=>{
                console.log("Duplicate User result: "+ result.data);
                console.log(result.message);
                assert(result.status==500);   
        }).then(done,done);    


    });

    it('Improper Email Format', function(done){
        const newUser = new user({
            username: 'sdfdfdf',
            password: '12343',
            email: 'sdfdfd@.com'
        }); 

        userController.Register(newUser)
            .then((result)=>{
                console.log("Improper Email Format result: "+ result.data);
                console.log(result.message);
                assert(result.status==500);   
        }).then(done,done);    


    });
    
 
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

});