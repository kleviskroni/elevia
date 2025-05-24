// eslint-disable-next-line import/no-unresolved
import nodemailer from 'nodemailer';

export async function sendPasswordResetEmail(email: string, token: string) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;
  // Configure your SMTP transport here
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.SMTP_FROM || 'noreply@elevia.it',
    to: email,
    subject: 'Reset password Elevia',
    text: `Per reimpostare la password, visita questo link: ${resetUrl}`,
    html: `<p>Per reimpostare la password, <a href="${resetUrl}">clicca qui</a>.</p>`,
  });
}
