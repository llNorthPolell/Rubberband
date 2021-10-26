const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ProjectSchema = new schema ({
    projectId: {
        type: String,
        required: true,
        unique: true
    },
    projectName: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true
    },
    lastModified: {
        type: Date,
        required: true
    }
});

const Project = mongoose.model('projects', ProjectSchema);

module.exports = Project;