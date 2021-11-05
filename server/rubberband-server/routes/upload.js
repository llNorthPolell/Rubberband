const express = require('express');
const multer = require('multer');
const uuid = require('uuid');
const path = require('path');


const pathConfig = require('../src/config/pathConfig.json');
const audioController = require('../src/controllers/audioController');

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        return cb(null,pathConfig.ROOT_FOLDER+pathConfig.AUDIO_FOLDER);
    },
    filename: (req,file,cb)=>{
        return cb(null,uuid.v4()+path.extname(file.originalname));
    }
})

const uploadAudioClip = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 },
    abortOnLimit: true,
    fileFilter: (req,file,cb)=>{
        if (!audioController.IsAudioFile(file)) {
            req.fileValidationError = "File rejected: "+ file.originalname +" is not in an acceptable format...";
            return cb(null, false,req.fileValidationError);
        }
    
        cb(null,true);
    }
}).single('audioClip');


router.post('/', (req, res) => {
  console.log('Running Upload from Server');
  console.log(req.body);

  res.send("Bad Request");
  res.status("400");
});

router.post('/audioclip', (req, res) => {
    console.log('Running Upload Audio Clip');
    
    uploadAudioClip(req,res,(err)=>{
        let validationResult = audioController.GetValidationErrors(req,err);

        if (validationResult.status!=200){
            res.send(validationResult.message);
            res.status(validationResult.status);
            res.send();
            return;
        }

        let audioClip = req.file;
        let owner = req.body.username;
        let tags = req.body.tags;

        audioController.StoreAudioClipEntry(audioClip,owner,tags)
            .then((result)=>{
                console.log(result.message);
                res.send(result.message);
                res.status(result.status);
                res.end();
            });

    });    
});

router.post('/song', (req, res) => {
    console.log('Running Upload Song');
    console.log(req.body);

});

module.exports = router;
