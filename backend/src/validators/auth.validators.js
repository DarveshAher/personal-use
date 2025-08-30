import { body } from 'express-validator';

export const signupValidator = [
  body('username').isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
];

export const loginValidator = [
  body('emailOrUsername').isString().notEmpty(),
  body('password').isString().notEmpty(),
];

export const resetRequestValidator = [ body('email').isEmail() ];
export const verifyEmailValidator = [ body('email').isEmail(), body('code').isLength({ min: 4 }) ];
export const resetPasswordValidator = [
  body('email').isEmail(),
  body('code').isLength({ min: 4 }),
  body('newPassword').isLength({ min: 6 }),
];
