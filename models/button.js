const mongoose = require('mongoose');

const buttonSchema = mongoose.Schema({
    title: { type: String, required: true },
    subtitles: [
        {
            subtitle: { type: String },
            answer: { type: String }
        }
    ]
});

const Button = mongoose.model('Button', buttonSchema);

module.exports = Button;