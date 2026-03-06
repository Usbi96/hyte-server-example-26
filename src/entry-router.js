import express from 'express';

import {
  listEntries,
  getEntry,
  deleteEntry,
  updateEntry
} from './entry-controller.js';

const router = express.Router();

router.get('/', listEntries);
router.get('/:id', getEntry);
router.put('/:id', updateEntry);
router.delete('/:id', deleteEntry);

export default router;
