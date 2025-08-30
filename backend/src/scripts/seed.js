import dotenv from 'dotenv';
import { connectDB } from '../utils/db.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

await connectDB();

const run = async () => {
  const email = 'demo@taxpal.app';
  const exists = await User.findOne({ email });
  if (exists) {
    console.log('Demo user already exists:', email);
  } else {
    const passwordHash = await bcrypt.hash('password123', 12);
    await User.create({ username: 'demo', email, passwordHash, isVerified: true });
    console.log('Created demo user: demo / password123');
  }
  process.exit(0);
};

run();
