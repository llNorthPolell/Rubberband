const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ProjectAccessSchema = new schema ({
    projectId: {
        type: String,
        required: true
    },
    accessId: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true
    },
    permissions:{
        type: Number,
        required: true
    }
});

const ProjectAccess = mongoose.model('users', ProjectAccessSchema);

module.exports = User;