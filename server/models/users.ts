import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  auth0Id: string; // Auth0 user ID
  email: string;
  name: string;
  notes: { noteId: mongoose.Types.ObjectId; accessLevel: mongoose.Types.ObjectId }[];
}

const UserSchema = new Schema<IUser>({
  auth0Id: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  notes: [
    {
      noteId: { type: Schema.Types.ObjectId, ref: 'Note', required: true },
      accessLevel: { type: Schema.Types.ObjectId, ref: 'AccessLevel', required: true },
    },
  ],
});

export const User = mongoose.model<IUser>('User', UserSchema);
