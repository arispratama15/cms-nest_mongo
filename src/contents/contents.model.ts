import * as mongoose from 'mongoose';

export const ContentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  konten: { type: String, required: true },
});

export interface Content extends mongoose.Document {
  id: string;
  author: string;
  konten: string;
}
