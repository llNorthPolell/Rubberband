const mocha = require('mocha');
const assert = require('assert');

const dbConnection = require('../src/models/dbConnection');
const audio = require('../src/models/audio');
const audioController = require('../src/controllers/audioController')

describe ('Audio Controller Tests', (done)=>{
    before((done)=>{
        dbConnection.Connect().then(done,done);
    });


    it('Get Newest Audio Clips', (done)=>{
        audioController.GetNewestAudioClips()
            .then((result)=>{
                console.log("Get Newest Audio Clips: "+ result.data);
                console.log(result.message);
                assert(result.status==200);   
        }).then(done,done);    
    });

    it('Search Audio Clips', (done)=>{
        const searchCriteria = "metal guitar riff"
        audioController.SearchAudioClips(searchCriteria)
            .then((result)=>{
                console.log("Search Audio Clips: "+ result.data);
                console.log(result.message);
                assert(result.status==200);   
        }).then(done,done);    
    });

    it('Search Audio Clips Containing Keyword', (done)=>{
        const searchCriteria = "um"
        audioController.SearchAudioClips(searchCriteria)
            .then((result)=>{
                console.log("Search Audio Clips Containing Keyword: "+ result.data);
                console.log(result.message);
                assert(result.status==200);   
        }).then(done,done);    
    });
});    