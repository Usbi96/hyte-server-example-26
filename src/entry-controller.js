import {
  getEntries,
  getEntryById,
  deleteEntryById,
  updateEntryById,
} from './entry-model.js';

export const listEntries = async (req, res) => {
  try {
    const entries = await getEntries();
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

    res.json(entry);
  } catch (error) {
    console.error('getEntry error:', error);
    res.status(500).json({message: 'Failed to get entry'});
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
