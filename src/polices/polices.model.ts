import * as mongoose from 'mongoose';
export const policesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  starting_date: { type: String, required: true },
  ending_date: { type: String, required: true },
});
export interface polices {
  name: string;
  starting_date: string;
  ending_date: string;
}
