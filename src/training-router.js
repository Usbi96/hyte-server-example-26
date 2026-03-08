import express from 'express';
import {
  listTraining,
  getTraining,
  postTraining,
  updateTraining,
  deleteTraining,
} from './training-controller.js';
import {authenticateToken} from './middlewares/authentication.js';

const router = express.Router();

router.get('/', authenticateToken, listTraining);
router.get('/:id', authenticateToken, getTraining);
router.post('/', authenticateToken, postTraining);
router.put('/:id', authenticateToken, updateTraining);
router.delete('/:id', authenticateToken, deleteTraining);

export default router;
