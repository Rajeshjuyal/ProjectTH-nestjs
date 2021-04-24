import * as mongoose from 'mongoose';
export const videoSchema = new mongoose.Schema({
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'channel',
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  comments: { type: Number, required: true },
  videos: { type: String, required: true },
  text: { type: String, required: true },
  pinned: { type: Boolean, required: true },
});
export interface video {
  channel: string;
  title: string;
  description: string;
  video: string;
  thumbnail: string;
  likes: number;
  dislikes: number;
  comments: number;
  videos: string;
  text: string;
  pinned: boolean;
}
