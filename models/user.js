const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['admin', 'user'] }
});

const User = mongoose.model('User', userSchema);

module.exports = User;