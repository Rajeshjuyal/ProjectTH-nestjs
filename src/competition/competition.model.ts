import * as mongoose from 'mongoose';
export const competitionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  starting_date: { type: String, required: true },
  // ending_date: { type: String, required: true },
  first_prize: { type: String, required: true },
  second_prize: { type: String, required: true },
  third_prize: { type: String, required: true },
});
export interface competition {
  name: string;
  starting_date: string;
  // ending_date: string;
  first_prize: string;
  second_prize: string;
  third_prize: string;
}
