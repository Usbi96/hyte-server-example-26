import express from 'express';
import cors from 'cors';

import {
  deleteItemById,
  getItemById,
  getItems,
  postNewItem,
  putItemById,
} from './items.js';

import entryRouter from './entry-router.js';
import userRouter from './user-router.js';
import authRouter from './auth-router.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/', express.static('public'));

app.get('/api', (req, res) => {
  res.send('Health diary API');
});


// AUTHENTICATION
app.use('/api/auth', authRouter);


// ITEMS
app.get('/api/items', getItems);
app.get('/api/items/:id', getItemById);
app.put('/api/items/:id', putItemById);
app.delete('/api/items/:id', deleteItemById);
app.post('/api/items', postNewItem);


// ENTRIES
app.use('/api/entries', entryRouter);


// USERS
app.use('/api/users', userRouter);


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
