import pool from './db.js';

export const getEntries = async () => {
  const [rows] = await pool.query('SELECT * FROM diaryentries');
  return rows;
};

export const getEntryById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM diaryentries WHERE entry_id = ?',
    [id]
  );
  return rows[0];
};

export const deleteEntryById = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM diaryentries WHERE entry_id = ?',
    [id]
  );
  return result;
};

export const updateEntryById = async (id, entry) => {
  const [result] = await pool.query(
    `UPDATE diaryentries
     SET mood = ?, weight = ?, sleep_hours = ?, notes = ?
     WHERE entry_id = ?`,
    [entry.mood, entry.weight, entry.sleep_hours, entry.notes, id]
  );
  return result;
};
