const Message = require('../models/Message')
const User = require("../models/User");
const MessageChannel = require('../models/MessageChannel')

addMessageChannel = (async (req) => {
  let body = req.channel;
  let user1 = await User.findOne({username: body.users[0].username});
  let user2 = await User.findOne({username: body.users[1].username});
  let newMessage = new Message(body.messages[0]);
  newMessage.save();
  const messageChannel1 = new MessageChannel({ users: [user1, user2], messages: [newMessage], lastSentDate: body.messages[0].date});
  await messageChannel1.save();
  body._id = messageChannel1._id;
  return body;
});

addMessage = (async (req) => {
  let newMessage = new Message(req.message);
  newMessage.save();
  let messageChannel1 = await MessageChannel.findOneAndUpdate(  {_id: req.channel}, { $push: {messages: newMessage}, $set: {lastSentDate: req.channel.lastSentDate}}, {new: true});
  return messageChannel1;
});

markMessageChannelRead = (async (req) => {

  let userId = req.userId;
  let messageChannelId = req.messageChannelId;
  let user1 = await User.findOne({_id: userId});
  let messageChannel1 = await MessageChannel.findOne({ _id: messageChannelId }).populate([
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

  for(let i = 0; i < messageChannel1.messages.length; i++) {
    let message = messageChannel1.messages[i];
    let foundMessage = await Message.findOneAndUpdate(  {_id: message._id}, {$addToSet: {readBy: user1}}, {new: true});
  }
});

module.exports = {
  addMessageChannel,
  addMessage,
  markMessageChannelRead
}

