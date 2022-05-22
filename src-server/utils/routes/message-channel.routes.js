const express = require('express');
const messageChannelRoute = express.Router();
const Message = require('../models/Message')
const User = require("../models/User");
const MessageChannel = require('../models/MessageChannel')

messageChannelRoute.route('/add-message-channel').post(async (req, res, next) => {

  let user1 = await User.findOne({username: req.body.users[0].username});
  if(!user1) { return res.status(400).send(user1);}
  let user2 = await User.findOne({username: req.body.users[1].username});
  if(!user2) { return res.status(400).send(user2);}

  let newMessage = new Message(req.body.messages[0]);
  newMessage.save();

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
});

messageChannelRoute.route('/user-message-channels/:id').get(async (req, res) => {

  let results = await MessageChannel.find({users: req.params.id}).sort({'lastSentDate': -1}).populate([
    {
      path: 'users',
      populate: [
        { path: 'friends'},
        { path: 'username'}
      ]
    }, {
      path: 'messages',
      populate: [
        { path: 'date' },
        { path: 'content'},
        { path: 'author',
          populate:
            [
              { path: 'friends' },
              { path: 'username' }
            ]
        },
        { path: 'readBy',
          populate:
            [
              { path: 'friends' },
              { path: 'username' }
            ]
        }
      ]
    }]);

  res.status(200).send(results);
})

module.exports = messageChannelRoute;

