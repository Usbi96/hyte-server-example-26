import {
  getEntriesByUserId,
  getEntryById,
  createEntry,
  deleteEntryById,
  updateEntryById,
} from './entry-model.js';

export const listEntries = async (req, res) => {
  try {
    const tokenUserId = Number(req.user.user_id);
    const entries = await getEntriesByUserId(tokenUserId);
    res.json(entries);
  } catch (error) {
    console.error('listEntries error:', error);
    res.status(500).json({message: 'Failed to get entries'});
  }
};

export const getEntry = async (req, res) => {
  try {
    const entry = await getEntryById(req.params.id);

    if (!entry) {
      return res.status(404).json({message: 'Entry not found'});
    }

    const tokenUserId = Number(req.user.user_id);
    const entryUserId = Number(entry.user_id);

    if (tokenUserId !== entryUserId) {
      return res.status(403).json({message: 'forbidden'});
    }

    res.json(entry);
  } catch (error) {
    console.error('getEntry error:', error);
    res.status(500).json({message: 'Failed to get entry'});
  }
};

export const postEntry = async (req, res) => {
  try {
    const {entry_date, mood, weight, sleep_hours, notes} = req.body;

    if (!entry_date || !mood) {
      return res.status(400).json({
        message: 'entry_date and mood are required',
      });
    }

    const newEntry = {
      user_id: Number(req.user.user_id),
      entry_date,
      mood,
      weight: weight ?? null,
      sleep_hours: sleep_hours ?? null,
      notes: notes ?? '',
    };

    const result = await createEntry(newEntry);

    res.status(201).json({
      message: 'Entry created',
      entry_id: result.insertId,
    });
  } catch (error) {
    console.error('postEntry error:', error);
    res.status(500).json({message: 'Failed to create entry'});
  }
};

export const deleteEntry = async (req, res) => {
  try {
    const entry = await getEntryById(req.params.id);

    if (!entry) {
      return res.status(404).json({message: 'Entry not found'});
    }

    const tokenUserId = Number(req.user.user_id);
    const entryUserId = Number(entry.user_id);

    if (tokenUserId !== entryUserId) {
      return res.status(403).json({message: 'forbidden'});
    }

    const result = await deleteEntryById(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({message: 'Entry not found'});
    }

    res.sendStatus(204);
  } catch (error) {
    console.error('deleteEntry error:', error);
    res.status(500).json({message: 'Failed to delete entry'});
  }
};

export const updateEntry = async (req, res) => {
  try {
    const entry = await getEntryById(req.params.id);

    if (!entry) {
      return res.status(404).json({message: 'Entry not found'});
    }

    const tokenUserId = Number(req.user.user_id);
    const entryUserId = Number(entry.user_id);

    if (tokenUserId !== entryUserId) {
      return res.status(403).json({message: 'forbidden'});
    }

    const result = await updateEntryById(req.params.id, req.body);

    if (result.affectedRows === 0) {
      return res.status(404).json({message: 'Entry not found'});
    }

    res.json({message: 'Entry updated'});
  } catch (error) {
    console.error('updateEntry error:', error);
    res.status(500).json({message: 'Failed to update entry'});
  }
};
