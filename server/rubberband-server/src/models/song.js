const mongoose = require('mongoose');
const schema = mongoose.Schema;

const SongSchema = new schema ({
    audioId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    albumId: {
        type: String
    }

});

const Song = mongoose.model('songs', SongSchema);

module.exports = Song;