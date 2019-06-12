var express = require('express');
var router = express.Router();
const User = require("../models/users");
const Chatroom = require("../models/chatrooms");

/* GET chat page. */
router.get('/:userId', function(req, res, next) {
    let user = null;
    let userId = req.params.userId
    let allChatroom = null;
    User.findById(req.params.userId).then(currentUser =>{
        user = currentUser;
        Chatroom.find().populate('creator')
            .then(allChatrooms => {
                allChatroom = allChatrooms;
                Chatroom.find({creator: userId}).then(myChatrooms =>{
                    res.render('chatrooms', {myChatrooms, allChatroom, user})
                })
            }).catch(error => {
                res.send(error)
        })
    });
});

router.post('/', (req, res, next) => {
    const chatroom = new Chatroom({
        chatName: req.body.name,
        about: req.body.description,
        creator: req.body.user_id
    });
    chatroom.save().then(createdRoom => {
        res.status(201).json({
            response: 'Chatroom Created!',
            room: createdRoom
        });
    }).catch(error => {
        res.status(500).json({
            response: "Chatroom creation failed. See Error!",
            error: error
        });
    });
})



module.exports = router;
