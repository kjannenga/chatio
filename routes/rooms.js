var express = require('express');
var router = express.Router();
const User = require("../models/users");
const Chatroom = require("../models/chatrooms");
const Messages = require("../models/messages");

router.get('/:chatId', function(req, res, next) {
    let chat = null;
    let chatId = req.params.chatId;
    Chatroom.findById(req.params.chatId).then(currentChat =>{
        chat = currentChat;
        Messages.find({messages: chatId}).then(chat =>{
            res.render('room', {chat})
        }).catch(error => {
            res.send(error)
        })
    });
});


router.post('/:chatId/message', (req, res, next) => {
    const message = new Message();
    let chatId = req.params.chatId;
    message.save().then(createdMessage => {
            res.redirect(`/${chatId}`)
    }).catch(error => {
        res.send(error)
    });
});

module.exports = router;