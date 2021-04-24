import * as mongoose from 'mongoose';
export const commentsSchema = new mongoose.Schema({
  text: { type: String, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  pinned: { type: Boolean, required: true },
});
export interface comments {
 
  text: string;
  likes: number;
  dislikes: number;
  pinned: boolean;
}
