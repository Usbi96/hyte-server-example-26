import pool from './db.js';

export const getUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
};

export const getUserById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE user_id = ?',
    [id]
  );
  return rows[0];
};

export const postUser = async (user) => {
  const [result] = await pool.query(
    'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
    [user.username, user.password, user.email]
  );
  return result;
};

export const putUserById = async (id, user) => {
  const [result] = await pool.query(
    'UPDATE users SET username = ?, password = ?, email = ? WHERE user_id = ?',
    [user.username, user.password, user.email, id]
  );
  return result;
};

export const deleteUserById = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM users WHERE user_id = ?',
    [id]
  );
  return result;
};

export const postLogin = async (username, password) => {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password]
  );
  return rows[0];
};
