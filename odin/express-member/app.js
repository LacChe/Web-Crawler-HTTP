require('dotenv').config()
const bcrypt = require('bcryptjs');

const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const User = require('./models/user.js');
const Message = require('./models/message.js');

const mongoDb = process.env.MONGO_DB_STRING;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

passport.use(
    new LocalStrategy(async(username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        };
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              // passwords match! log user in
              return done(null, user)
            } else {
              // passwords do not match!
              return done(null, false, { message: "Incorrect password" })
            }
        })
      } catch(err) {
        return done(err);
      };
    })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch(err) {
      done(err);
    };
});

app.get("/", async function(req, res) {
    const messages = await Message.find().populate("user");
    console.log(messages)
    res.render("index", { user: req.user, messages: messages.reverse() });
});

app.post("/new-message", async function(req, res, next) {
  const msg = new Message({message: req.body.message, user: req.user._id, date: new Date()})
  await msg.save();
  res.redirect('/');
});

app.get("/sign-up", (req, res) => res.render("sign-up-form"));
app.post("/sign-up", async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if(err) {
            console.log(err);
        } else {
            try {
              const user = new User({
                username: req.body.username,
                password: hashedPassword
              });
              const result = await user.save();
              res.redirect("/");
            } catch(err) {
              return next(err);
            };
        }
    });
});

app.post(
    "/log-in",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
);

app.get("/log-out", (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
});

app.listen(3000, () => console.log("app listening on port 3000!"));