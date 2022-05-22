const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  author: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  content: {
    type:  String,
  },
  date: {
    type: Date
  },
  readBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
})

module.exports = mongoose.model("Message", MessageSchema)
