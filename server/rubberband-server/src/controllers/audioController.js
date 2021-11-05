const Audio = require('../models/audio');
const multer = require('multer');
const path = require('path');

const StoreAudioClipEntry = async (audioClip, owner, tags) =>{
    return new Promise((resolve, reject) => {
        console.log(audioClip);
        let audioEntry = new Audio();
        audioEntry.audioId = path.parse(audioClip.filename).name;
        audioEntry.creator = owner;
        audioEntry.tags = tags.split(',');
        audioEntry.fileName = audioClip.filename;
        audioEntry.createDate = new Date();

        audioEntry.save((err, audioEntry)=>{
            if (err) reject(err);
            resolve({status:200,message:"File "+ audioClip.originalname + " uploaded successfully!", data:audioEntry.audioId});
        });
        
    });
}

const IsAudioFile = (file) => {
    return file.mimetype==='audio/mpeg' || file.mimetype==='audio/wave';
}

const GetValidationErrors = (req,err) =>{
    if (req.fileValidationError)
        return {status:500, message:req.fileValidationError,data:null };
    
    
    if (err instanceof multer.MulterError)
        return {status:err.code, message:err.message,data:null };
    

    if (!req.file)
        return {status:500, message:"No files were uploaded...",data:null };
    
    return {status:200, message:"", data:null};
}


const GetNewestAudioClips = async () => {
    return SearchAudioClips();
}

const SearchAudioClips = async (searchString, sortByCreateDate = true, limit=50)=>{
    return new Promise((resolve,reject)=>{
        let query = (searchString)? BuildQuery(searchString):{};
        let resultSet = Audio.find(query);

        if (sortByCreateDate)
            resultSet = resultSet.sort([['createDate',-1]]);


        resultSet.limit(limit)
            .exec((err, results)=>{
                if (err) reject(err);
                resolve({status:200, message:"",data:results });
            });
    });
}

const BuildQuery = (searchString)=>{
    let keywords = searchString.split(" ");
    let output = {$or:[]};

    for (const keyword of keywords){
        output.$or.push({tags:{$regex:keyword}}); 
    }
    return output;
}


module.exports.StoreAudioClipEntry = StoreAudioClipEntry;
module.exports.IsAudioFile = IsAudioFile;
module.exports.GetValidationErrors = GetValidationErrors;
module.exports.GetNewestAudioClips = GetNewestAudioClips;
module.exports.SearchAudioClips = SearchAudioClips;