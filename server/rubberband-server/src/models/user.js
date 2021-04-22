const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema ({
    username: String,
    password: String
});

const User = mongoose.model('users', UserSchema);

module.exports = User;