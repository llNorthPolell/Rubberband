const bcrypt = require('bcrypt');

const User = require('../models/user');


const Login = async (username, password) => {

    let user = await User.findOne({ username: username }).exec();

    
    return new Promise((resolve, reject) => {
        if (user) {
            bcrypt.compare(password, user.password, (err, match) => {
                if (err) {
                    reject(err);
                }
                if (match) {
                    resolve({status:200,message:"Welcome back " + username + "!", data:user});
                } else {
                    resolve({status:500,message:"Access denied...", data:null});
                }
            });
        }
        else {
            resolve({status:500,message:"Invalid user " + username + "...", data:null});
        }
    });
}


const Register = async (newUser)=>{
    return new Promise((resolve, reject)=>{
        const saltRounds = 10;
        let failedMessages = __ValidateNewUser(newUser);

        if (failedMessages.length>0){
            resolve ({status:500,message:failedMessages.toString(), data:null});
            return;
        }

        bcrypt.hash(newUser.password,saltRounds,(err,hash) => {
            if (err) reject(err);
            let newUserToSave = new User(newUser);
            newUserToSave.password = hash;
            newUserToSave.createDate = new Date();
            newUserToSave.lastLogin = new Date();
            newUserToSave.accountType = "standard";

            newUserToSave.save().then(()=>{
                resolve({status:200,message:"Registration Successful!", data:newUserToSave});
            }).catch((err)=>{
                switch (err.code){
                    case 11000:
                        resolve ({status:500,message:"User "+ newUser.username +" already exists. Please choose another username...", data:null});
                    default:
                        console.log("Error in saving to database: "+ err);
                        reject (err);
                }
            });
        });
    });

}

const __ValidateNewUser = (newUser) =>{
    let failedMessages = [];
    let emailPattern = /^[a-z0-9._-]+@[a-z_]+\.[a-z]{2,3}$/;

    if (newUser.username == null){
        failedMessages.push("Username is required...");
    }
        
    if (newUser.password == null){
        failedMessages.push("Password is required...");
    }

    if (newUser.email == null){
        failedMessages.push("Email is required...");
    }
    else if (!newUser.email.toLowerCase().match(emailPattern)){
        failedMessages.push("Email is not in valid format...");
    }


    return failedMessages;
}




module.exports.Login = Login;
module.exports.Register = Register;