const mongoose = require('mongoose');
const schema = mongoose.Schema;

const BandProfileSchema = new schema ({
    bandId: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    tags: [{
        type: String
    }]
});

const BandProfile = mongoose.model('bandProfiles', BandProfileSchema);

module.exports = BandProfile;