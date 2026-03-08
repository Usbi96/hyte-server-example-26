import express from 'express';
import {body} from 'express-validator';
import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
} from './user-controller.js';
import {authenticateToken} from './middlewares/authentication.js';
import {validationErrorHandler} from './middlewares/error-handler.js';

const router = express.Router();

router.get('/', listUsers);

router.post(
  '/',
  body('username')
    .trim()
    .isLength({min: 3, max: 20})
    .withMessage('username must be 3-20 characters long')
    .isAlphanumeric()
    .withMessage('username must be alphanumeric'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('must be a valid email address')
    .normalizeEmail(),
  body('password')
    .trim()
    .isLength({min: 8, max: 128})
    .withMessage('password must be at least 8 characters long'),
  validationErrorHandler,
  createUser
);

router.get('/:id', getUser);

router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, removeUser);

export default router;
