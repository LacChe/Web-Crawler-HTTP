import dotenv from "dotenv";
dotenv.config();

import { passportInit } from './passport/passport.js';

import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRouter from './routes/auth.js';

import { connectDB } from './database/index.js';

// connect to mongoDB
connectDB();

const app = express();

// connect views
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// initialize passport 
passportInit(express, app);

app.use('/auth', authRouter);

app.get("/", (req, res) => {
    res.render("index", { user: req.user });
});

app.listen(3000, () => console.log("app listening on port 3000!"));