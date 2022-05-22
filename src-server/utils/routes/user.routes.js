const express = require('express');
const app = express();
const userRoute = express.Router();
const User = require("../models/User");

userRoute.route('/add-user').post((req, res, next) => {

  const { username, rooms } = req.body;
  let reqUser = req.body;
  reqUser.friends = [];

  User.findOne({username: reqUser.username}).then((results) => {
    return results;

  }).then((results) => {

    if(results) {
      return res.status(400).send(results);
    }

    const user1 = new User(reqUser);
    user1.save().then(() => {
      res.status(201).send(user1);
    }).catch((error) => {
      res.status(400).send(error);
    });
  })

});

userRoute.route('/login').post((req, res, next) => {
  User.findOne({username: req.body.username}).then((results) => {
    return results;

  }).then(async (results) => {

    if(!results) {
      return res.status(400).send("User not registered");
    }

    return res.status(200).send(results);

  }).catch((error) => {
    res.status(400).send("Failed to load registered user");
  });

});


userRoute.route('/register').get((req, res) => {
  res.json({res: "register"});

})

module.exports = userRoute;
