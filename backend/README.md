# Taxpal Backend (Express + MongoDB + OTP)

A ready-to-run backend for your Taxpal UI (login, signup, email OTP verify/reset, and income/expense CRUD).

## Quick Start

```bash
# 1) Install
npm install

# 2) Configure
cp .env.example .env
# fill MONGODB_URI (Atlas), SMTP_*, and JWT_SECRET

# 3) Run in dev
npm run dev

# 4) Seed a demo user (optional)
npm run seed
```

## REST Endpoints

Base: `/api`

### Auth
- `POST /api/auth/signup` – { username, email, phone?, country?, incomeBracket?, password }
- `POST /api/auth/verify-email` – { email, code }
- `POST /api/auth/login` – { emailOrUsername, password } → { token }
- `POST /api/auth/forgot-password` – { email }
- `POST /api/auth/verify-reset-otp` – { email, code }
- `POST /api/auth/reset-password` – { email, code, newPassword }

### Money (JWT required: `Authorization: Bearer <token>`)
- `GET /api/records?kind=income|expense`
- `POST /api/records` – { kind, description, amount, category, date, notes? }
- `PATCH /api/records/:id` – any of the above
- `DELETE /api/records/:id`

## Notes

- OTPs are 6-digit codes valid for 10 minutes and stored in the `otps` collection with a TTL index so they auto-delete after expiry.
- Passwords are hashed using bcryptjs.
- Update CORS origin(s) with `CLIENT_URL` in `.env` to match your frontend.
- For testing email, you can use [Ethereal](https://ethereal.email/). Put your generated credentials into the SMTP fields.

## Folder Structure
```
src/
  controllers/
  middleware/
  models/
  routes/
  scripts/
  utils/
  validators/
```

Enjoy!
