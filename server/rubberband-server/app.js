const express = require('express');
//const logger = require('morgan');



const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const uploadRouter = require('./routes/upload');

const dbConnection = require('./src/models/dbConnection');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register',registerRouter);
app.use('/upload', uploadRouter);

dbConnection.Connect();


let server = app.listen(8080, ()=>{
    console.log('Rubberband server is up!');
});


module.exports = app;
