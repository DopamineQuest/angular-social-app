const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true,
    validate(value) {
      if(value.trim().includes(" ")) {
        throw new Error('Username cannot contain spaces');
      }
    }
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
})

module.exports = mongoose.model("User", UserSchema)
