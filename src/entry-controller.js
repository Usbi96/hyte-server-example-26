import {
  getEntries,
  getEntryById,
  deleteEntryById,
  updateEntryById
} from './entry-model.js';

export const listEntries = async (req, res) => {
  const entries = await getEntries();
  res.json(entries);
};

export const getEntry = async (req, res) => {
  const entry = await getEntryById(req.params.id);

  if (!entry) {
    return res.status(404).json({ message: 'Entry not found' });
  }

  res.json(entry);
};

export const deleteEntry = async (req, res) => {
  await deleteEntryById(req.params.id);
  res.sendStatus(204);
};

export const updateEntry = async (req, res) => {
  await updateEntryById(req.params.id, req.body);
  res.json({ message: 'Entry updated' });
};
