const mongoose = require('mongoose');

const dbConfig = require('../config/dbconfig.json');


const Connect = async (done)=>{
    // Connect to MongoDB
    await mongoose.connect(dbConfig.connectionString, {
        autoReconnect: true,
        reconnectTries: 1000000,
        reconnectInterval: 10000,
        bufferMaxEntries: 0 // Disable node driver's buffering as well
      });

    mongoose.connection.once('open',()=>{
        console.log('Successfully connected to MongoDB!');
        done();
    }).on('error',(error)=>{
        console.log('Connection error: '+ error);
        done();
    }).on('reconnected',()=>{
        console.log('Connection reconnected!');
    }).on('disconnected', ()=>{
        console.log('Connection disconnected...');
    }).once('close',()=>{
        console.log('Closing connection with database...')
    });
    
    process.on('SIGINT',()=>{
        this.Close();
    });

}

const Close = ()=>{
    mongoose.connection.close(()=>{
        console.log('DB connection closed successfully!');
        process.exit();
    });
}



module.exports.Connect = Connect;
module.exports.Close = Close;