import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import {selectUserByName} from './auth-model.js';

const postLogin = async (req, res) => {
  console.log('postLogin body:', req.body);

  try {
    const {username, password} = req.body;

    const user = await selectUserByName(username);

    if (!user) {
      return res.status(401).json({message: 'invalid username'});
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({message: 'invalid password'});
    }

    const userForToken = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      user_level: user.user_level,
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res.json({
      message: 'login ok',
      user: userForToken,
      token,
    });
  } catch (error) {
    console.error('postLogin error:', error);
    res.status(500).json({message: 'login failed'});
  }
};

const getMe = async (req, res) => {
  console.log('getMe user:', req.user);

  if (req.user) {
    res.json({
      message: 'token ok',
      user: req.user,
    });
  } else {
    res.sendStatus(401);
  }
};

export {postLogin, getMe};
