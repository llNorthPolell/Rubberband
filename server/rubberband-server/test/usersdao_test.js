const mocha = require('mocha');
const assert = require('assert');
const dbConnection = require('../src/models/dbConnection')
const user = require('../src/models/user');



describe ('User Data Access Tests', function(done){
    before(function(done){
        return dbConnection.Connect(done);
    });

    
    it('Add New User', function(){
        var newuser = new user({
            username: 'abcd',
            password: '12345678'
        });

        newuser.save().then(function(){
            assert(newuser.isNew === false);
            done();
        });
    });
    
    
    /*it('Get User', function(){

    })*/

    after(function(){
        return dbConnection.Disconnect();
    })
});