const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;