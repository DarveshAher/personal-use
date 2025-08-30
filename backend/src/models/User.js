import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  phone: { type: String },
  country: { type: String },
  incomeBracket: { type: String },
  passwordHash: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
