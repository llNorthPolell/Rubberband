const mongoose = require('mongoose');

const dbConfig = require('../config/dbconfig.json');


const Connect = function(done){
    // Connect to MongoDB
    mongoose.connect(dbConfig.connectionString,done);

    mongoose.connection.once('open',function(){
        console.log('Successfully connected to MongoDB!');
    }).on('error',function(error){
        console.log('Connection error: '+ error);
    });
}

const Disconnect = function(){
    mongoose.disconnect();
    console.log('Connection has been closed successfully');
}



module.exports.Connect = Connect;
module.exports.Disconnect = Disconnect;