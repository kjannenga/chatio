var express = require('express');
var router = express.Router();
const User = require('../models/users');

/* GET users listing. */
router.post('/login', (req, res, next) => {
  User.findOne({ username: req.body.username})
      .then(user => {
        res.cookie('username', user.username)
            .redirect(`/chatrooms/${user._id}`);
      }).catch( error => {
    res.send(error)
  })
});

router.post('/signup', (req, res, next) => {
  const user = new User({username: req.body.username, password: req.body.password});
  user.save().then(createdUser => {
    res.cookie('username', user.username)
        .redirect(`/chatrooms/${createdUser._id}`);
  }).catch(error => {
    res.send(error)
  });
});


module.exports = router;
