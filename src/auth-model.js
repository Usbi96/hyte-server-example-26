import pool from './db.js';

const selectUserByName = async (username) => {
  try {
    const sql = `
      SELECT user_id, username, password, email, user_level
      FROM users
      WHERE username = ?
    `;

    const [rows] = await pool.execute(sql, [username]);
    return rows[0];
  } catch (error) {
    console.error('selectUserByName error:', error);
    throw error;
  }
};

export {selectUserByName};
