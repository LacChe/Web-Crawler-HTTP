import { Router } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

const router = Router();

router.get('/', (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async function(err, authData) {
    if(err) {
      res.sendStatus(403);
    } else {
      const users = await User.find();
      return res.json(users);
    }
  });
});

router.get('/:userId', (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async function(err, authData) {
    if(err) {
      res.sendStatus(403);
    } else {
      const user = await User.findOne({ _id: req.params.userId });
      return res.json(user);
    }
  });
});

export default router;