import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  code: { type: String, required: true },
  purpose: { type: String, enum: ['verify_email', 'reset_password', 'login'], required: true },
  expiresAt: { type: Date, required: true, index: true },
}, { timestamps: true });

// TTL index (expiresAt in the past will delete immediately)
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Otp', otpSchema);
