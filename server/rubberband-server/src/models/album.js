const mongoose = require('mongoose');
const schema = mongoose.Schema;

const AlbumSchema = new schema ({
    albumId: {
        type: String,
        required: true,
        unique: true
    },
    albumName: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true
    },
    tags: [{
        type: String
    }]
});

const Album = mongoose.model('albums', AlbumSchema);

module.exports = Album;