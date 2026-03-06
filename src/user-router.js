import express from 'express';
import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
  loginUser,
} from './user-controller.js';

const router = express.Router();

router.get('/', listUsers);
router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', removeUser);

export default router;
