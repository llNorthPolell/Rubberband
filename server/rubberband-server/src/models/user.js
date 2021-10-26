const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true
    },
    lastLogin: {
        type: Date,
        required: true
    },
    accountType: {
        type: String,
        required: true
    }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;