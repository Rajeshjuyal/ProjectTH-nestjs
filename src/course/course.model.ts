import * as mongoose from 'mongoose';
export const courseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  image: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  title: { type: String, required: true },
  ported: { type: String, required: true },
});
export interface course {
  user: string;
  image: string;
  price: string;
  description: string;
  title: string;
  ported: string;
}
