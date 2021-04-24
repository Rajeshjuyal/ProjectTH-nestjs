import * as mongoose from 'mongoose';
export const subscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  views: { type: Number, required: true },
  channel_name: { type: String, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
});
export interface Subscription {
  name: string;
  views: number;
  channel_name: string;
  likes: number;
  dislikes: number;
}
