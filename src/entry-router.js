import express from 'express';
import {
  listEntries,
  getEntry,
  deleteEntry,
  updateEntry,
} from './entry-controller.js';
import {authenticateToken} from './middlewares/authentication.js';

const router = express.Router();

router.get('/', listEntries);
router.get('/:id', getEntry);

router.put('/:id', authenticateToken, updateEntry);
router.delete('/:id', authenticateToken, deleteEntry);

export default router;
