const mongoose = require('mongoose');

const chatroomSchema = mongoose.Schema({
    chatName: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Chatroom', chatroomSchema);