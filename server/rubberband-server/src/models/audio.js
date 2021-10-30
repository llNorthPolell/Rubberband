const mongoose = require('mongoose');
const schema = mongoose.Schema;
var ObjectIdSchema = schema.ObjectId;

const AudioSchema = new schema ({
    audioId:{
        type: String,
        require: true
    },
    createDate: {
        type: Date,
        required: true
    },
    tags: [{
        type: String
    }],
    creator: {
        type: String,
        required: true
    }
});




const Audio = mongoose.model('audio', AudioSchema);

module.exports = Audio;