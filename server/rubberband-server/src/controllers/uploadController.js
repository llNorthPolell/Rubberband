const Audio = require('../models/audio');
const path = require('path');


const StoreAudioClipEntry = async (audioClip, owner, tags) =>{
    return new Promise((resolve, reject) => {
        console.log(audioClip);
        let audioEntry = new Audio();
        audioEntry.audioId = audioClip.filename;
        audioEntry.creator = owner;
        audioEntry.tags = tags.split(',');
        audioEntry.createDate = new Date();

        audioEntry.save((err, audioEntry)=>{
            if (err) reject(err);
            resolve({status:200,message:"File "+ audioClip.originalname + " uploaded successfully!", data:audioEntry.audioId});
        });
        
    });
}


module.exports.StoreAudioClipEntry = StoreAudioClipEntry;