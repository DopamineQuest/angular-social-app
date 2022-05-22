const express =  require('express');
const app = require("express")();
const router = express.Router();
const http = require("http").Server(app);
cors = require('cors');
const bodyParser = require("body-parser");
const userRoute = require('./utils/routes/user.routes')
const messageChannelRoute = require("./utils/routes/message-channel.routes");
const messageRoute = require("./utils/routes/message.routes");
const mongoose = require("mongoose")
const User = require("./utils/models/User")
const { addMessageChannel, markMessageChannelRead } = require("./utils/auxiliary/aux");
const { addMessage } = require("./utils/auxiliary/aux");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
const uri = require( "./utils/auxiliary/env");
const io = require("socket.io")(http, {
  cors: [{
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  }]
});

const port = process.env.Port || 9090;

messages = [];

const r = router.get("/",(req,res) => {
  res.json({res: "/"});
})

mongoose.connect(uri.uri, {
  useNewUrlParser: true
});

app.use('/api', userRoute);
app.use('/api', messageChannelRoute);
app.use('/api', messageRoute);

io.of("/user").on("connection", (socket) => {
    const db = [];
    console.log('New WebSocket connection')
    onJoin(socket, db);
    onSetup(socket);
    onMessage(socket, db);
    onLogin(socket, db);
    onJoinRoom(socket)
    onAddMessageChannel(socket);
    onAddMessage(socket);
    onMarkMessageChannelRead(socket)
    onAllSearchedUsers(socket);
    onMessageRequest(socket);
    onDisconnect(socket, db);
});


function onJoin(socket, db) {
  socket.on('join', ({username, id, rooms}, callback) => {

  })
}

function onDisconnect(socket, db) {
  socket.on('disconnect', () => {
    const userBySocketId = socket.id
    if(userBySocketId) {
      messages.push(`${userBySocketId.username} has left`);
      socket.broadcast.emit('newMessage', `${userBySocketId.username} has left`)
      console.log('disconnect!!')
    }
  })
}

function onMessage(socket, db) {
  socket.on('message', (msg, res) => {
    const user = socket.id.toString();
    let message =  user.toString() +" "+ msg.message.toString();
    messages.push(message);
    messages.forEach(msg => console.log(msg));
    io.of('user').emit('newMessage', message)
    res({
      resMessage: "received!"
    })
  })
}

function onSetup(socket) {
  socket.on('setup', userData => {

    console.log('onSetup');
    socket.join(userData._id);
    socket.emit("connected");
  })
}

function onJoinRoom(socket) {
  socket.on('join room', channelData => {
    socket.join(channelData);
    socket.emit("room joined!");
  })
}

function onAddMessageChannel(socket) {
  socket.on('add channel', async (channelData, callback) => {
    let newMessageChannel = await addMessageChannel(channelData);
    callback(newMessageChannel)
    socket.to(channelData.channel.users[1]._id).emit("channel added", newMessageChannel)
  })
}

function onAddMessage(socket) {
  socket.on('send message', async (channelData, callback) => {
    let message = await addMessage(channelData);
    //TODO only send channel id, not entire channel with messages
    let msg = channelData.message

    for (let i = 0; i < channelData.channel.users.length; i++) {
      let userId = channelData.channel.users[i]._id;
      if (msg.author._id !== userId)
        socket.to(userId).emit("message received", channelData)
    }
  })
}

function onMarkMessageChannelRead(socket) {
  socket.on('mark message channel read', (channelData, callback) => {
    markMessageChannelRead(channelData);
  })
}

function onLogin(socket, db) {
  socket.on('onLogin', ({username, id, rooms}, callback) => {

    if(!username) {
      return socket.emit('logout'); //old
    }

    var obj = {};

    for (var i = 0; i < messages.length; i++)
      obj[messages[i]] = 0;

    messages.push(`${socket.id.toString()} has joined`);
    socket.emit('allMessages', obj); //old
    socket.broadcast.emit('newMessage', `${socket.id.toString()} has joined`)
  })
}


function onAllSearchedUsers(socket) {
  socket.on('onAllSearchedUsers', ( data, callback) => {
    //TODO move to aux
    User.find({
      $and: [
        {
          username:
            {
              "$regex": data.msg.toString(), "$options": "i"
            }
        },
        {
        username: {
          $ne: data.user.username.toString()
        }
      }]
    }).limit(10).then((results) => {
      socket.emit('allSearchedUsers', results); //old
    });

    var obj = {};

    for (let i = 0; i < messages.length; i++)
      obj[messages[i]] = 0;

  })
}

function onMessageRequest(socket) {
  socket.on('messageRequest', (data, res) => {
    res({
      resMessage: "received!"
    })
  })
}

http.listen(port, () => {
  console.log(`Chat server is running on PORT - ${port}`)
});
