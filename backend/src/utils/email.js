import nodemailer from 'nodemailer';

export const mailer = async () => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return transporter;
};

export const sendMail = async ({ to, subject, text, html }) => {
  const transporter = await mailer();
  const info = await transporter.sendMail({
    from: process.env.FROM_EMAIL || 'no-reply@example.com',
    to,
    subject,
    text,
    html,
  });
  return info;
};
