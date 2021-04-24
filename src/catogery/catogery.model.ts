import * as mongoose from 'mongoose';
export const catogerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
});
export interface catogery {
  name: string;
  icon: string;
}
