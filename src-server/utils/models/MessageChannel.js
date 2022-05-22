const mongoose = require('mongoose');

const MessageChannelSchema = new mongoose.Schema({
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Message'
}],
  lastSentDate: {
    type: Date
  }
})

module.exports = mongoose.model("MessageChannel", MessageChannelSchema)
