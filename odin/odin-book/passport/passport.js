import dotenv from "dotenv";
dotenv.config();

import bcrypt from 'bcryptjs';

import session from "express-session";
import passport from "passport";

import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;

import { User } from '../database/index.js';

export function passportInit(express, app) {

    app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.urlencoded({ extended: false }));

    passport.use(
        new LocalStrategy(async(username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
            return done(null, false, { message: "Incorrect username" });
            };
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                return done(null, user)
                } else {
                return done(null, false, { message: "Incorrect password" })
                }
            })
        } catch(err) {
            return done(err);
        };
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(async function(id, done) {
        try {
        const user = await User.findById(id);
        done(null, user);
        } catch(err) {
        done(err);
        };
    });

}