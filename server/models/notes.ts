import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
    title: string;
    content: string;
    users: { userId: mongoose.Types.ObjectId; accessLevel: mongoose.Types.ObjectId }[];
}
  
const NoteSchema = new Schema<INote>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    users: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        accessLevel: { type: Schema.Types.ObjectId, ref: 'AccessLevel', required: true },
      },
    ],
});

// This is the key change - check if model exists before creating
export const Note = mongoose.models.Note || mongoose.model<INote>('Note', NoteSchema);