import express from 'express';
import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
} from './user-controller.js';

import {authenticateToken} from './middlewares/authentication.js';

const router = express.Router();

router.get('/', listUsers);
router.post('/', createUser);

router.get('/:id', getUser);

// protected routes
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, removeUser);

export default router;
