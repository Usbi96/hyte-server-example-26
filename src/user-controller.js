import {
  getUsers,
  getUserById,
  postUser,
  putUserById,
  deleteUserById,
  postLogin,
} from './user-model.js';

export const listUsers = async (req, res) => {
  const users = await getUsers();

  const safeUsers = users.map(({ password, ...user }) => user);

  res.json(safeUsers);
};

export const getUser = async (req, res) => {
  const user = await getUserById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }

  const { password, ...safeUser } = user;

  res.json(safeUser);
};

export const createUser = async (req, res) => {
  const result = await postUser(req.body);

  res.status(201).json({
    message: 'user created',
    user_id: result.insertId,
  });
};

export const updateUser = async (req, res) => {
  const result = await putUserById(req.params.id, req.body);

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'user not found' });
  }

  res.json({ message: 'user updated' });
};

export const removeUser = async (req, res) => {
  const result = await deleteUserById(req.params.id);

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'user not found' });
  }

  res.sendStatus(204);
};

export const loginUser = async (req, res) => {
  const user = await postLogin(req.body.username, req.body.password);

  if (!user) {
    return res.status(401).json({ message: 'invalid credentials' });
  }

  const { password, ...safeUser } = user;

  res.json({
    message: 'login ok',
    user: safeUser,
  });
};
