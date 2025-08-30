import { body } from 'express-validator';

export const recordValidator = [
  body('kind').isIn(['income','expense']),
  body('description').isLength({ min: 1 }),
  body('amount').isFloat({ min: 0 }),
  body('category').isString().notEmpty(),
  body('date').isISO8601(),
];
