import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

export interface User extends mongoose.Document {
  id: string;
  nama: string;
  username: string;
  password: string;
  isAdmin: boolean;
}
