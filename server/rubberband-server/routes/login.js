const express = require('express');
const router = express.Router();
const userController = require('../src/controllers/userController');


router.use((req,res,next)=>{
  next();
});

router.post('/', function(req, res) {
  console.log('Running Login from Server');
  console.log(req.body);

  userController.Login(req.body.username, req.body.password)
      .then((result)=> {
          console.log(result.message);
          res.send(result.message);
          res.status(result.status);
          res.end();
          
      }); 
});


module.exports = router;
