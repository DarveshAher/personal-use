import mongoose from 'mongoose';

const base = {
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  notes: { type: String },
};

const recordSchema = new mongoose.Schema({
  kind: { type: String, enum: ['income','expense'], required: true },
  ...base
}, { timestamps: true });

export default mongoose.model('Record', recordSchema);
