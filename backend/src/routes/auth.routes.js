import { Router } from 'express';
import { signup, verifyEmail, login, requestPasswordReset, verifyResetOtp, resetPassword } from '../controllers/auth.controller.js';
import { signupValidator, loginValidator, resetRequestValidator, verifyEmailValidator, resetPasswordValidator } from '../validators/auth.validators.js';

const r = Router();

r.post('/signup', signupValidator, signup);
r.post('/verify-email', verifyEmailValidator, verifyEmail);
r.post('/login', loginValidator, login);
r.post('/forgot-password', resetRequestValidator, requestPasswordReset);
r.post('/verify-reset-otp', verifyEmailValidator, verifyResetOtp);
r.post('/reset-password', resetPasswordValidator, resetPassword);


r.post('/request-login-otp', requestLoginOtp);
r.post('/verify-login-otp', verifyLoginOtp);

export default r;

