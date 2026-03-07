import bcrypt from 'bcryptjs';
import {
  getUsers,
  getUserById,
  postUser,
  putUserById,
  deleteUserById,
} from './user-model.js';

export const listUsers = async (req, res) => {
  try {
    const users = await getUsers();

    const safeUsers = users.map((user) => {
      const safeUser = { ...user };
      delete safeUser.password;
      return safeUser;
    });

    res.json(safeUsers);
  } catch (error) {
    console.error('listUsers error:', error);
    res.status(500).json({ message: 'failed to get users' });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    const safeUser = { ...user };
    delete safeUser.password;

    res.json(safeUser);
  } catch (error) {
    console.error('getUser error:', error);
    res.status(500).json({ message: 'failed to get user' });
  }
};

export const createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userData = {
      ...req.body,
      password: hashedPassword,
    };

    const result = await postUser(userData);

    res.status(201).json({
      message: 'user created',
      user_id: result.insertId,
    });
  } catch (error) {
    console.error('createUser error:', error);
    res.status(500).json({ message: 'user creation failed' });
  }
};

export const updateUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const tokenUserId = Number(req.user.user_id);
    const paramUserId = Number(req.params.id);

    if (tokenUserId !== paramUserId) {
      return res.status(403).json({ message: 'forbidden' });
    }

    const existingUser = await getUserById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({ message: 'user not found' });
    }

    let updatedPassword = existingUser.password;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      updatedPassword = await bcrypt.hash(req.body.password, salt);
    }

    const userData = {
      username: req.body.username ?? existingUser.username,
      email: req.body.email ?? existingUser.email,
      password: updatedPassword,
    };

    const result = await putUserById(req.params.id, userData);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'user not found' });
    }

    res.json({ message: 'user updated' });
  } catch (error) {
    console.error('updateUser error:', error);
    res.status(500).json({ message: 'user update failed' });
  }
};

export const removeUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const tokenUserId = Number(req.user.user_id);
    const paramUserId = Number(req.params.id);

    if (tokenUserId !== paramUserId) {
      return res.status(403).json({ message: 'forbidden' });
    }

    const result = await deleteUserById(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'user not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error('removeUser error:', error);
    res.status(500).json({ message: 'user delete failed' });
  }
};
