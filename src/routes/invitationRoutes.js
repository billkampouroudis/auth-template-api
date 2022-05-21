import { Router } from 'express';
import {
  createInvitation,
  getInvitation,
  listInvitations,
  removeInvitation
} from '../controllers/invitationController';
import auth from '../middlewares/auth';

const invitations = Router();

invitations.post('/', auth, async (req, res) => {
  res.json(await createInvitation(req, res));
});

invitations.get('/:invitationId', auth, async (req, res) => {
  res.json(await getInvitation(req, res));
});

invitations.get('/', auth, async (req, res) => {
  res.json(await listInvitations(req, res));
});

invitations.delete('/:invitationId', auth, async (req, res) => {
  res.json(await removeInvitation(req, res));
});

export default invitations;
