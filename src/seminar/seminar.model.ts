import * as mongoose from 'mongoose';
export const seminarSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  name: { type: String, required: true },
  id: { type: String, required: true },
  price: { type: String, required: true },
  logo: { type: String, required: true },
  date: { type: String, required: true },
  duration: { type:Number, required: true },
});
export interface seminar {
  user: string;
  name: string;
  id: string;
  price: string;
  logo: string;
  date: string;
  duration: number;
}
