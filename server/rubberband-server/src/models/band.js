const mongoose = require('mongoose');
const schema = mongoose.Schema;

const BandSchema = new schema ({
    bandId: {
        type: String,
        required: true,
        unique: true
    },
    bandName: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true
    }
});

const Band = mongoose.model('bands', BandSchema);

module.exports = Band;