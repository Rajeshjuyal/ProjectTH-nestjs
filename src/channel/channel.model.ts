import * as mongoose from 'mongoose';
export const channelSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  catogery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'catogery',
  },
  name: { type: String, required: true },
  cover_photo: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  subscriber: { type: String, required: true },
  create: { type: String, required: true },
  strike: { type: String, required: true },
  video: { type: mongoose.Schema.Types.ObjectId, ref: 'video', required: true },
});
export interface channel {
  user: string;
  catogery: string;
  name: string;
  cover_photo: string;
  category: string;
  description: string;
  subscription: string;
  create: string;
  strike: string;
  video: string;
}
