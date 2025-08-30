import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import Otp from '../models/Otp.js';
import { sendMail } from '../utils/email.js';

const signToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const newOtp = () => String(Math.floor(100000 + Math.random() * 900000)); // 6-digit

export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { username, email, phone, country, incomeBracket, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already registered' });

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ username, email, phone, country, incomeBracket, passwordHash });

  // send verification OTP
  const code = newOtp();
  const expiresAt = new Date(Date.now() + 10*60*1000);
  await Otp.create({ user: user._id, code, purpose: 'verify_email', expiresAt });
  try {
    await sendMail({
      to: user.email,
      subject: 'Verify your Taxpal account',
      text: `Your verification code is ${code}. It expires in 10 minutes.`,
      html: `<p>Your verification code is <b>${code}</b>. It expires in 10 minutes.</p>`,
    });
  } catch (e) {
    console.error('Email send failed:', e.message);
  }

  if (String(process.env.DEV_RETURN_OTP).toLowerCase() === 'true') { return res.status(201).json({ message: 'User created. Verify email with OTP (DEV)', userId: user._id, code }); }
  res.status(201).json({ message: 'User created. Verify email with OTP.', userId: user._id });
};

export const verifyEmail = async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const otp = await Otp.findOne({ user: user._id, purpose: 'verify_email' }).sort({ createdAt: -1 });
  if (!otp || otp.code !== code) return res.status(400).json({ message: 'Invalid code' });
  if (otp.expiresAt < new Date()) return res.status(400).json({ message: 'Code expired' });
  user.isVerified = true;
  await user.save();
  await Otp.deleteMany({ user: user._id, purpose: 'verify_email' });
  res.json({ message: 'Email verified' });
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { emailOrUsername, password } = req.body;
  const user = await User.findOne({ $or: [{ email: emailOrUsername.toLowerCase() }, { username: emailOrUsername }] });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
  const token = signToken(user);
  res.json({ token, user: { id: user._id, username: user.username, email: user.email, isVerified: user.isVerified } });
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const code = newOtp();
  const expiresAt = new Date(Date.now() + 10*60*1000);
  await Otp.create({ user: user._id, code, purpose: 'reset_password', expiresAt });
  try {
    await sendMail({
      to: user.email,
      subject: 'Taxpal password reset code',
      text: `Your password reset code is ${code}. It expires in 10 minutes.`,
      html: `<p>Your password reset code is <b>${code}</b>. It expires in 10 minutes.</p>`,
    });
  } catch (e) {
    console.error('Email send failed:', e.message);
  }
  if (String(process.env.DEV_RETURN_OTP).toLowerCase() === 'true') { return res.json({ message: 'OTP sent (DEV)', code }); }
  res.json({ message: 'OTP sent to email' });
};

export const verifyResetOtp = async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const otp = await Otp.findOne({ user: user._id, purpose: 'reset_password' }).sort({ createdAt: -1 });
  if (!otp || otp.code !== code) return res.status(400).json({ message: 'Invalid code' });
  if (otp.expiresAt < new Date()) return res.status(400).json({ message: 'Code expired' });
  res.json({ message: 'OTP valid' });
};

export const resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const otp = await Otp.findOne({ user: user._id, purpose: 'reset_password' }).sort({ createdAt: -1 });
  if (!otp || otp.code !== code) return res.status(400).json({ message: 'Invalid code' });
  if (otp.expiresAt < new Date()) return res.status(400).json({ message: 'Code expired' });
  user.passwordHash = await bcrypt.hash(newPassword, 12);
  await user.save();
  await Otp.deleteMany({ user: user._id, purpose: 'reset_password' });
  res.json({ message: 'Password updated' });
};


// === Added: Login OTP (request & verify) ===
export const requestLoginOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const code = newOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await Otp.create({ user: user._id, code, purpose: 'login', expiresAt });

    try {
      await sendMail({
        to: email,
        subject: 'Your Login OTP',
        text: `Your login OTP is ${code}. It expires in 10 minutes.`,
        html: `<p>Your login OTP is <b>${code}</b>. It expires in 10 minutes.</p>`,
      });
    } catch (e) {
      console.warn('Email send failed (continuing for dev):', e.message);
    }

    const payload = { message: 'OTP sent to email' };
    if (String(process.env.DEV_RETURN_OTP).toLowerCase() === 'true') {
      payload.code = code;
    }
    return res.json(payload);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to request OTP' });
  }
};

export const verifyLoginOtp = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ message: 'Email and code are required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = await Otp.findOne({ user: user._id, purpose: 'login' }).sort({ createdAt: -1 });
    if (!otp || otp.code !== code) return res.status(400).json({ message: 'Invalid code' });
    if (otp.expiresAt < new Date()) return res.status(400).json({ message: 'Code expired' });

    await Otp.deleteMany({ user: user._id, purpose: 'login' });

    const token = signToken(user);
    return res.json({ message: 'OTP verified', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to verify OTP' });
  }
};
