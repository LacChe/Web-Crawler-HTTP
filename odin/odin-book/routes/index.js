import express from 'express';
var router = express.Router();

import { Post, FriendRequest, Comment } from '../database/index.js';

router.get("/", async function(req, res) {

    // get all friend requests
    let requests = await FriendRequest.find({ to: req.user }).populate("from");

    // get all users and friends posts
    let posts = [];
    if(req.user) {
        let friendList = [req.user._id];
        if(req.user.friends) friendList = friendList.concat(req.user.friends);
        posts = await Post.find({ 
            user: { $in: friendList} 
        }).populate("user");
    }

    // get all comments related to these posts
    let postIds = [];
    for(let i = 0; i < posts.length; i++) {
        postIds.push(posts[i]._id);
    }
    const allComments = await Comment.find({ post: { $in: postIds }}).populate("user post");
    // map all comments to post ids
    const commentsMap = new Map();
    for(let i = 0; i < allComments.length; i++) {
        if(!commentsMap.get(allComments[i].post._id.toString())) {
            commentsMap.set(allComments[i].post._id.toString(), [allComments[i]]);
        } else {
            commentsMap.set(
                allComments[i].post._id.toString(), 
                [allComments[i], ...commentsMap.get(allComments[i].post._id.toString())]
            );
        }
    }

    res.render("index", { user: req.user, posts: posts.reverse(), requests: requests, comments: commentsMap });
});

export default router;