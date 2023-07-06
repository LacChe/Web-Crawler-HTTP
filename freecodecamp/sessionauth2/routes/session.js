var express = require('express');
const { default: User } = require('../models/user');
var router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = User({ username, email, password });
    const sessionUser = { userId: newUser.id, username: newUser.username };
    await newUser.save();
    req.session.user = sessionUser;
    res.send(sessionUser);
  } catch (err) {
    res.status(400).send(err);
  }
})

router.post('/signin', async function(req, res) {
  try {
    if(req.session.user){
      // check session
      const user = await User.findById(req.session.user.userId);
      if(user && user.username === req.session.user.username) {
        const sessionUser = { userId: user.id, username: user.username };
        req.session.user = sessionUser;
        res.send(sessionUser);
      } else {
        throw new Error('Invalid login credentials');
      }
    } else {
      // check credentials
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if(user && user.comparePasswords(password)) {
        const sessionUser = { userId: user.id, username: user.username };
        req.session.user = sessionUser;
        res.send(sessionUser);
      } else {
        throw new Error('Invalid login credentials');
      }
    }
  } catch (err) {
      res.status(401).send(err);
  }
});

router.post('/signout', async function({ session }, res) {
  try {
    const user = session.user;
    if(user) {
      session.destroy(err => {
        if(err) throw (err);
        res.clearCookie(process.env.SESSION_NAME);
        res.send(user);
      })
    } else {
      throw new Error('Something went wrong');
    }
  } catch (err) {
      res.status(401).send(err);
  }
});

module.exports = router;
