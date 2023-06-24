import express from 'express';
var router = express.Router();

import passport from "passport";
import bcrypt from 'bcryptjs';

import { User } from '../database/index.js';

router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/signup", (req, res) => res.render("signup-form"));

router.post("/signup", async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if(err) return next(err);
    try {
      const user = new User({
        username: req.body.username,
        password: hashedPassword
      });
      await user.save();
      res.redirect("/");
    } catch(err) {
      return next(err);
    };
  });
});

export default router;