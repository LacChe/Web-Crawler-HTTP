import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

import User from './models/user.js';

import routes from './routes/index.js';

const app = express();

// Set up mongoose connection
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_DB_STRING;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', verifyToken, routes.user);
app.use('/posts', verifyToken, routes.post);
app.use('/posts/:postId/comments', verifyToken, (req, res, next) => {
  req.postId = req.params.postId;
  next();
}, routes.comment);

app.post('/api/login', async function(req, res) {
  const user = await User.findOne({ username: req.headers.username, password: req.headers.password });

  jwt.sign({user}, process.env.JWT_SECRET, (err, token) => {
    res.json({
      token
    });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);