import mongoose, { Schema, Document } from 'mongoose';

export interface IAccessLevel extends Document {
  name: string; // e.g., "read", "write", "admin"
  description: string; // A short description of what the access level allows
}

const AccessLevelSchema = new Schema<IAccessLevel>({
  name: { type: String, required: true, enum: ['read', 'write', 'admin'], unique: true },
  description: { type: String, required: true },
});

export const AccessLevel = mongoose.model<IAccessLevel>('AccessLevel', AccessLevelSchema);
