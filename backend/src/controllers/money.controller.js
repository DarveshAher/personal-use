import { validationResult } from 'express-validator';
import Record from '../models/Record.js';

export const createRecord = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const rec = await Record.create({ ...req.body, user: req.user._id });
  res.status(201).json(rec);
};

export const listRecords = async (req, res) => {
  const { kind } = req.query;
  const q = { user: req.user._id, ...(kind ? { kind } : {}) };
  const recs = await Record.find(q).sort({ date: -1, createdAt: -1 });
  res.json(recs);
};

export const updateRecord = async (req, res) => {
  const { id } = req.params;
  const rec = await Record.findOneAndUpdate({ _id: id, user: req.user._id }, req.body, { new: true });
  if (!rec) return res.status(404).json({ message: 'Not found' });
  res.json(rec);
};

export const deleteRecord = async (req, res) => {
  const { id } = req.params;
  const rec = await Record.findOneAndDelete({ _id: id, user: req.user._id });
  if (!rec) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
};
