import pool from './db.js';

export const getTrainingByUserId = async (userId) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM Training
     WHERE user_id = ?
     ORDER BY training_date DESC, created_at DESC`,
    [userId]
  );
  return rows;
};

export const getTrainingEntryById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM Training WHERE training_id = ?',
    [id]
  );
  return rows[0];
};

export const createTrainingEntry = async (training) => {
  const [result] = await pool.query(
    `INSERT INTO Training
      (user_id, training_date, training_type, duration_minutes, calories)
     VALUES (?, ?, ?, ?, ?)`,
    [
      training.user_id,
      training.training_date,
      training.training_type,
      training.duration_minutes,
      training.calories,
    ]
  );

  return result;
};

export const updateTrainingById = async (id, training) => {
  const [result] = await pool.query(
    `UPDATE Training
     SET training_date = ?, training_type = ?, duration_minutes = ?, calories = ?
     WHERE training_id = ?`,
    [
      training.training_date,
      training.training_type,
      training.duration_minutes,
      training.calories,
      id,
    ]
  );
  return result;
};

export const deleteTrainingById = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM Training WHERE training_id = ?',
    [id]
  );
  return result;
};
