var express = require('express');
var router = express.Router();
require('dotenv').config()
const mongoose = require("mongoose");

const Message = require("../models/message");

let messages = [];

/* GET home page. */
router.get('/', function(req, res, next) {

  // Set up mongoose connection
  mongoose.set("strictQuery", false);
  const mongoDB = process.env.MONGO_DB_STRING;

  main().catch((err) => console.log(err));
  async function main() {
    await mongoose.connect(mongoDB);
    messages = await Message.find();
    res.render('index', { title: 'Mini Messageboard', messages });
  }

});

router.get('/new', function(req, res, next) {
  res.render('form');
});

router.post('/new', async function(req, res, next) {
  const msg = new Message({message: req.body.message, name: req.body.name, date: new Date()})
  await msg.save();
  messages.push({text: req.body.message, user: req.body.name, added: new Date()});
  console.log('saved', msg);
  res.redirect('/');
});

module.exports = router;
