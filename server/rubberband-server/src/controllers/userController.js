const bcrypt = require('bcrypt');

const user = require('../models/user');


const Login = function (username, password){

    user.findOne({username:username}, function(err,user){
        if (err){
            console.log("Error while fetching user data...");
            //TODO: Send Response
            return;
        }
        if (user){
            bcrypt.compare(password,user.password, function(err,match){     
                if (err){
                    console.log("Error logging in; error: "+ err);
                    // TODO: Send Response 
                }   
                if (match){
                    console.log("Welcome back " + username +"!");
                    // TODO: Send Response 
                }
                else {
                    console.log('Access Denied...');
                    // TODO: Send Response 
                }
            });    
        }
        else {
            console.log("Invalid user "+username+"...");
            // TODO: Send Response 
        }          
    });

    return true;
}


const Register = function (newUser){
    const saltRounds = 10;
    
    try{
        bcrypt.hash(newUser.password,saltRounds,function(err,hash){
            console.log('Hashing password...');
            var newUserToSave = new user(newUser);
            newUserToSave.password = hash;

            console.log('Saving user to database...');
            newUserToSave.save().then(function(err){
                console.log("User has been added to the database!");
                // TODO: Send Response
                return true;
            }).catch(function(err){
                switch (err.code){
                    case 11000:
                        console.log("User "+ newUser.username +" already exists. Please choose another username...");
                        break;
                    default:
                        console.log("Error in saving to database: "+ err);
                        break;
                }
                // TODO: Send Response
                return false;             
            });        
        })
    }
    catch(err){
        console.log("Error in hashing password: "+ err);
        return false;
        // TODO: Send Response
    }
}

module.exports.Login = Login;
module.exports.Register = Register;