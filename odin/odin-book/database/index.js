import { connectDB } from './mongoDB.js';
import User from './models/user.js'
import Post from './models/post.js'
import Comment from './models/comment.js'
import FriendRequest from './models/friendRequest.js'

export {
    connectDB,
    User,
    Post,
    FriendRequest,
    Comment,
}