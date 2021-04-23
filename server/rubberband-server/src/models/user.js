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
    }

});

const User = mongoose.model('users', UserSchema);

module.exports = User;