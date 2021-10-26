const express = require('express');
//const logger = require('morgan');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');


const dbConnection = require('./src/models/dbConnection');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register',registerRouter);

dbConnection.Connect();

/*
app.get('/',(req,res)=>{
    res.send('Hello World!');
    res.status(200);
});*/



let server = app.listen(8080, ()=>{
    console.log('Rubberband server is up!');
});


module.exports = app;
