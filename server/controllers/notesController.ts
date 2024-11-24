import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Note } from '../models/notes';
import { User } from '../models/users';


export const getNotesForUser = async (req: Request, res: Response) => {

  console.log(mongoose.modelNames());
  
  try {
    const userId = req.user.auth0Id; // Assumes `auth0Id` is added to `req.user` by the middleware.

    const user = await User.findOne({ auth0Id: userId }).populate('notes.noteId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const notes = user.notes.map((note) => ({
      id: note.noteId._id,
      title: note.noteId.title,
      accessLevel: note.accessLevel,
    }));

    

    return res.json(notes);
  } catch (error) {
    console.error('Error fetching notes for user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
