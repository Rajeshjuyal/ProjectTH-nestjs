import * as mongoose from 'mongoose';
export const purchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'course',
    required: true,
  },
  status: { type: Boolean, required: true },
});
export interface course {
  user: string;
  course: string;
  status: boolean;
}
