const app = require("express")();
const http = require("http").Server(app);
const { generateMessage } = require('./utils/messages.js')
const { addUser, removeUser, getUser, getUsersInRoom, clearUsers, getUserByUsername } = require('./utils/users')
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});
const mongo = require("mongodb").MongoClient;

const port = process.env.Port || 9090;

io.of("/user").on("connection", (socket) => {
  mongo.connect("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  }).then(
    client => {
      // console.log("SUCCESSSS!");
      // const db = client.db("social-app");
      // const chatsCollection = db.collection("user");
      // chatsCollection.find({}).toArray((err, documents) => {
      //   socket.emit("chatList", documents);
      // });
      // const userCollection = db.collection("user");
      // userCollection.aggregate([
      //   {
      //     $group: {
      //       _id: "$chatName",
      //       count: {
      //         $sum: 1
      //       }
      //     }
      //   }
      // ]).toArray((err, documents) => {
      //   socket.join("orders");
      //   socket.emit("pizzaOrdersCount", documents);
      // });

      // socket.on("newPizzaOrder", order => {
      //   socket.join("orders");
      //   pizzaOrdersCollection.inserOne(order).then(
      //     refreshedOrder => {
      //       pizzaOrdersCollection.aggregate([
      //         {
      //           $group: {
      //             _id: "$pizzaName",
      //             count: {
      //               $sum: 1
      //             }
      //           }
      //         }
      //       ]).toArray((err, documents) => {
      //         io.of("/pizza").to("orders").emit("pizzaOrdersCount", documents);
      //       });
      //     }
      //   );
      // });

      console.log('New WebSocket connection')

      // socket.on('test', (res) => {
      //   console.log('test!!!!!~')
      //
      //   res('test')
      // })


      socket.on('join', ({username, room}, res) => {
        console.log('joined!!!~')
        const { error, user } = addUser({id: socket.id, username, room})

        if(error) {
          //socket.emit('message', generateMessage('Cannot join!'))
          // err(error)
          console.log('----error!!', error)

          // const user = getUser(socket.id);
          // res({
          //   _id: user.id,
          //   _username: user.username
          // })

          return;
        }

        // socket.join(user.room)
        // socket.emit('message', generateMessage('','Welcome!'))
        // socket.broadcast.to(user.room).emit('message', generateMessage('',`${user.username} has joined`))
        // //console.log('test: ',user.username.toString())
        //
        // io.to(user.room).emit('roomData', {
        //   room: user.room,
        //   users: getUsersInRoom(user.room)
        // })

        res({
          _id: user.id,
          _username: user.username
        })
      })

      socket.on('getUserByUsername', (username, res) => {
        console.log('getUser!!!!~')
        const user = getUserByUsername(username);

        // if(error) {
        //   //socket.emit('message', generateMessage('Cannot join!'))
        //   // err(error)
        //   console.log('----error!!', error)
        //
        //
        //   return;
        // }

        res({
          _id: user.id,
          _username: user.username
        })
      })

      socket.emit("connected", () => {
        console.log("logged from server side connected")
      });





      socket.on('disconnect', () => {
        const user  = removeUser(socket.id)

        // if(error) {
        //     //socket.emit('message', generateMessage('Cannot join!'))
        //     // callback(error)
        //     return
        // }

        // if(user) {
        //   io.to(user.room).emit('message', generateMessage('',`${user.username} has left`))
        //   io.to(user.room).emit('roomData', {
        //     room: user.room,
        //     users: getUsersInRoom(user.room)
        //   })
        // }
      })


    }
  )
});

http.listen(port, () => {
  console.log(`Chat server is running on PORT - ${port}`)
});
