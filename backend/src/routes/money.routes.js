import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { recordValidator } from '../validators/money.validators.js';
import { createRecord, listRecords, updateRecord, deleteRecord } from '../controllers/money.controller.js';

const r = Router();

r.use(auth);
r.get('/records', listRecords);
r.post('/records', recordValidator, createRecord);
r.patch('/records/:id', updateRecord);
r.delete('/records/:id', deleteRecord);

export default r;
