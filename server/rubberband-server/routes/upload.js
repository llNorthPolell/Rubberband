const express = require('express');
const multer = require('multer');
const uuid = require('uuid');
const path = require('path');


const pathConfig = require('../src/config/pathConfig.json');
const uploadController = require('../src/controllers/uploadController');

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
        if (!___isAudioFile(file)) {
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
        console.log(req);
        if (req.fileValidationError){
            res.send(req.fileValidationError)
            res.status(500);
            res.end();
            return;
        }
        
        if (err instanceof multer.MulterError){
            res.send(err.message)
            res.status(err.code);
            res.end();
            return;
        }

        if (!req.file){ 
            res.send("No files were uploaded...")
            res.status(500);
            res.end();
            return;
        }
        

        let audioClip = req.file;
        console.log(req.body);

        let owner = req.body.username;
        let tags = req.body.tags;

        uploadController.StoreAudioClipEntry(audioClip,owner,tags)
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


const ___isAudioFile = (file) => {
    return file.mimetype==='audio/mpeg' || file.mimetype==='audio/wave';
}



module.exports = router;
