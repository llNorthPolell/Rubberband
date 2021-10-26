const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserProfileSchema = new schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    introduction: {
        type: String
    },
    instruments: [{
        type: String
    }]

});

const UserProfile = mongoose.model('userProfiles', UserProfileSchema);

module.exports = UserProfile;