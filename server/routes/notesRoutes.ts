import express from 'express';
import { getNotesForUser } from '../controllers/notesController';
import { authenticate } from '../middlewares/authenticate';


const router = express.Router();

router.get('/getAll', authenticate, getNotesForUser);

export default router;
