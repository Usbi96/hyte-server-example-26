import express from 'express';
import {
  listEntries,
  getEntry,
  postEntry,
  deleteEntry,
  updateEntry,
} from './entry-controller.js';
import {authenticateToken} from './middlewares/authentication.js';

const router = express.Router();

router.get('/', authenticateToken, listEntries);
router.get('/:id', authenticateToken, getEntry);
router.post('/', authenticateToken, postEntry);
router.put('/:id', authenticateToken, updateEntry);
router.delete('/:id', authenticateToken, deleteEntry);

export default router;
