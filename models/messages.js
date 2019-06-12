const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chatroom',
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Message', messageSchema);