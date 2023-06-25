import express from 'express';
var router = express.Router();

import { Post, Comment } from '../database/index.js';

router.post("/", async function(req, res) {
    const msg = new Post({
        user: req.user,
        message: req.body.message,
        date: new Date(),
    });
    await msg.save();
    res.redirect('/');
});

router.post("/:postId/comment", async function(req, res) {
    const comment = new Comment({
        user: req.user,
        post: req.params.postId,
        comment: req.body.comment,
        date: new Date(),
    });
    await comment.save();
    res.redirect('/');
});

router.post("/:postId/like", async function(req, res) {
    const post = await Post.findOne({ _id: req.params.postId });
    if(!post.likes.includes(req.user._id)) {
        let likes = [...post.likes, req.user._id];
        await Post.findOneAndUpdate({ _id: req.params.postId }, { likes: likes });
    }
    res.redirect('/');
});

export default router;