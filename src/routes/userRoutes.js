import { Router } from 'express';
import {
  createUser,
  getUser,
  listUsers,
  removeUser,
  updateUser,
  updateUserPassword
} from '../controllers/userController';
import auth from '../middlewares/auth';

const users = Router();

users.post('/', auth, async (req, res) => {
  res.json(await createUser(req, res));
});

users.patch('/:userId', auth, async (req, res) => {
  res.json(await updateUser(req, res));
});

users.patch('/password/:userId', auth, async (req, res) => {
  res.json(await updateUserPassword(req, res));
});

users.get('/:userId', auth, async (req, res) => {
  res.json(await getUser(req, res));
});

users.get('/', async (req, res) => {
  res.json(await listUsers(req, res));
});

users.delete('/:userId', auth, async (req, res) => {
  res.json(await removeUser(req, res));
});

export default users;
