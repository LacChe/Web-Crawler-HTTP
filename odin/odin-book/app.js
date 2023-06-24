import dotenv from "dotenv";
dotenv.config();

import { passportInit } from './passport/passport.js';

import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRouter from './routes/auth.js';

import { connectDB, User, Post, FriendRequest } from './database/index.js';

// connect to mongoDB
connectDB();

const app = express();

// connect views
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// initialize passport 
passportInit(express, app);

app.use('/auth', authRouter);

app.get("/", async function(req, res) {

    // get all friend requests
    let requests = await FriendRequest.find({ to: req.user }).populate("from");

    // get all users and friends posts
    let posts;
    if(req.user) {
        let friendList = [req.user._id];
        if(req.user.friends) friendList = friendList.concat(req.user.friends);
        posts = await Post.find({ 
            user: { $in: friendList} 
        }).populate("user");
    }

    res.render("index", { user: req.user, posts: posts?.reverse(), requests: requests, handleFriendRequest: handleFriendRequest });
});

app.post("/post", async function(req, res) {
    const msg = new Post({
        user: req.user,
        message: req.body.message,
        date: new Date(),
    });
    await msg.save();
    res.redirect('/');
});

app.post("/add-friend", async function(req, res) {
    const friend = await User.findOne({ username: req.body.friendname });
    if(friend) {
        //create friend request
        const request = new FriendRequest({
            from: req.user,
            to: friend._id,
        });
        await request.save();
    }
    res.redirect('/');
});

app.post("/friend-request-confirm/:id", async function(req, res) {
    console.log('yes', req.params.id);
    res.redirect('/'); //TODO
});

app.post("/friend-request-deny/:id", async function(req, res) {
    console.log('no', req.params.id);
    res.redirect('/'); //TODO
});

app.listen(3000, () => console.log("app listening on port 3000!"));

function handleFriendRequest(){
    console.log('123123');
} 