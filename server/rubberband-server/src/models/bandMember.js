const mongoose = require('mongoose');
const schema = mongoose.Schema;

const BandMemberSchema = new schema ({
    username: {
        type: String,
        required: true
    },
    bandId: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

const BandMember = mongoose.model('bandMembers', BandMemberSchema);

module.exports = BandMember;