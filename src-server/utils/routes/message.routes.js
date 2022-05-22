const express = require('express');
const messageRoute = express.Router();
const Message = require('../models/Message')
const User = require("../models/User");
const MessageChannel = require('../models/MessageChannel')

messageRoute.route('/add-message').post(async (req, res, next) => {

  let user1 = await User.findOne({username: req.body.users[0].username});
  if(!user1) { return res.status(400).send(user1);}
  let user2 = await User.findOne({username: req.body.users[1].username});
  if(!user2) { return res.status(400).send(user2);}

  let newMessage = new Message(req.body.messages[0]);
  newMessage.save();

  if(req.body._id === '') {
    const messageChannel1 = new MessageChannel({ users: [user1, user2], messages: [newMessage], lastSentDate: req.body.messages[0].date});
    messageChannel1.save().then(async (results) => {
      user1['messageChannels'] = [results.id];
      user1.save();
      user2['messageChannels'] = [results.id];
      user2.save();
      res.status(201).send(results);
    }).catch((error) => {
      res.status(400).send(error);
    });
  } else {
    let messageChannel = await MessageChannel.findOne({_id: req.body._id});
  }

});

module.exports = messageRoute;
