import * as mongoose from 'mongoose';
export const paymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  // duration: { type: String, required: true },
  // days: { type: String, required: true },
});
export interface payment {
  name: string;
  id: string;
  // duration: string;
  // days: string;
}
