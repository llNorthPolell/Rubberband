const express = require('express');
const router = express.Router();
const userController = require('../src/controllers/userController');


router.use((req,res,next)=>{
  next();
});

router.post('/', function(req, res) {
  console.log('Running Register from Server');
  console.log(req.body);

  userController.Register(req.body.user)
      .then((result)=> {
          console.log(result.message);
          res.send(result.message);
          res.status(result.status);
          res.end();
          
      }); 
});


module.exports = router;
