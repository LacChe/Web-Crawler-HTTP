import { Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import Comment from '../models/comment.js';

const router = Router();

router.get('/', async function(req, res) {
  const comments = await Comment.find({ post: req.postId}).populate("user", '-password -_id -__v').populate("post");
  return res.json(comments);
});

router.get('/:commentId', async function(req, res) {
  const comment = await Comment.findOne({ post: req.postId, _id: req.params.commentId }).populate("user", '-password -_id -__v').populate("post");
  return res.json(comment);
});

router.post('/', (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async function(err, authData) {
    if(err) {
      res.sendStatus(403);
    } else {
      const comment = new Comment({
        user: req.body.user,
        post: req.postId,
        text: req.body.text,
        date: new Date()
      })
      await comment.save();
      return res.json(comment);
    }
  });
});

router.delete('/:commentId', (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async function(err, authData) {
    if(err) {
      res.sendStatus(403);
    } else {
      const comment = await Comment.deleteOne({ post: req.postId, _id: req.params.commentId });
      return res.json(comment);
    }
  });
});

export default router;