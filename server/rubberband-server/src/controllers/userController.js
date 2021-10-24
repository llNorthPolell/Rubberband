const bcrypt = require('bcrypt');

const User = require('../models/user');


const Login = async (username, password) => {

    let user = await User.findOne({ username: username }).exec();

    
    return new Promise((resolve, reject) => {
        if (user) {
            bcrypt.compare(password, user.password, (err, match) => {
                if (err) {
                    console.log("Error occurred while attempting to login: " + err.message);
                    reject(err);
                }
                if (match) {
                    console.log("Welcome back " + username + "!");
                    resolve({status:200,message:"Welcome back " + username + "!", data:user});
                } else {
                    console.log("Access denied...");
                    resolve({status:500,message:"Access denied...", data:null});
                }
            });
        }
        else {
            console.log("Invalid user " + username + "...");
            resolve({status:500,message:"Invalid user " + username + "...", data:null});
        }
    });
}


const Register = (newUser)=>{
    const saltRounds = 10;
    
    try{
        bcrypt.hash(newUser.password,saltRounds,(err,hash)=>{
            console.log('Hashing password...');
            let newUserToSave = new user(newUser);
            newUserToSave.password = hash;

            console.log('Saving user to database...');
            newUserToSave.save().then((err)=>{
                console.log("User has been added to the database!");
                // TODO: Send Response
                return true;
            }).catch((err)=>{
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