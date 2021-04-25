import * as mongoose from 'mongoose';
export const participationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  competition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'competition',
    required: true,
  },
});
export interface participation {
  user: string;
  competition: string;
}
