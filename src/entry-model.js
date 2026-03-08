import pool from './db.js';

export const getEntriesByUserId = async (userId) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM DiaryEntries
     WHERE user_id = ?
     ORDER BY entry_date DESC, created_at DESC`,
    [userId]
  );
  return rows;
};

export const getEntryById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM DiaryEntries WHERE entry_id = ?',
    [id]
  );
  return rows[0];
};

export const createEntry = async (entry) => {
  const [result] = await pool.query(
    `INSERT INTO DiaryEntries
      (user_id, entry_date, mood, weight, sleep_hours, notes)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      entry.user_id,
      entry.entry_date,
      entry.mood,
      entry.weight,
      entry.sleep_hours,
      entry.notes,
    ]
  );

  return result;
};

export const deleteEntryById = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM DiaryEntries WHERE entry_id = ?',
    [id]
  );
  return result;
};

export const updateEntryById = async (id, entry) => {
  const [result] = await pool.query(
    `UPDATE DiaryEntries
     SET entry_date = ?, mood = ?, weight = ?, sleep_hours = ?, notes = ?
     WHERE entry_id = ?`,
    [
      entry.entry_date,
      entry.mood,
      entry.weight,
      entry.sleep_hours,
      entry.notes,
      id,
    ]
  );
  return result;
};
