import express from 'express';
var router = express.Router();

import { User, FriendRequest } from '../database/index.js';

router.post("/add-friend", async function(req, res) {
    const friend = await User.findOne({ username: req.body.friendname });
    const existingReq = await FriendRequest.findOne({ to: friend, from: req.user });
    if(friend && !existingReq) {
        //create friend request
        const request = new FriendRequest({
            from: req.user,
            to: friend._id,
        });
        await request.save();
    }
    res.redirect('/');
});

router.post("/request-confirm/:id", async function(req, res) {
    const friendRequest = await FriendRequest.findOne({ _id: req.params.id });

    // get users
    const self = await User.findOne({ _id: friendRequest.to });
    const friend = await User.findOne({ _id: friendRequest.from });

    // add to friends
    let selfFriends = [friendRequest.from, ...self.friends];
    let friendFriends = [friendRequest.to, ...friend.friends];

    // update users
    await User.findOneAndUpdate({ _id: self._id }, { friends: selfFriends });
    await User.findOneAndUpdate({ _id: friend._id }, { friends: friendFriends });

    // delete friend request
    await FriendRequest.deleteOne( { _id: req.params.id });

    res.redirect('/');
});

router.post("/request-deny/:id", async function(req, res) {
    await FriendRequest.deleteOne( { _id: req.params.id });
    res.redirect('/');
});

export default router;