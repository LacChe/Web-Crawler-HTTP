import dotenv from "dotenv";
dotenv.config();

import { passportInit } from './passport/passport.js';

import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import indexRouter from './routes/index.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import postRouter from './routes/post.js';

import { connectDB } from './database/index.js';

// connect to mongoDB
connectDB();

const app = express();

// connect views
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// initialize passport 
passportInit(express, app);

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(3000, () => console.log("app listening on port 3000!"));