import { Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import Post from '../models/post.js';

const router = Router();

router.get('/', async function(req, res) {
  const posts = await Post.find().populate("user", '-password -_id -__v');
  return res.json(posts);
});

router.get('/:postId', async function(req, res) {
  const post = await Post.findOne({ _id: req.params.postId }).populate("user", '-password -_id -__v');
  return res.json(post);
});

router.post('/', (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async function(err, authData) {
    if(err) {
      res.sendStatus(403);
    } else {
      const post = new Post({
        user: req.body.user, 
        content: req.body.content, 
        date: new Date()
      })
      await post.save();
      return res.json(post);
    }
  });
});

router.delete('/:postId', (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async function(err, authData) {
    if(err) {
      res.sendStatus(403);
    } else {
      const post = await Post.deleteOne({ _id: req.params.postId });
      return res.json(post);
    }
  });
});

export default router;