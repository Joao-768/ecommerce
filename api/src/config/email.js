import "dotenv/config";
import nodemailer from "nodemailer";

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name} (set it in api/.env)`);
  }
  return value;
}

export function createEmailTransporter() {
  const user = requiredEnv("EMAIL_USER");
  const pass = requiredEnv("EMAIL_PASS");

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendEmail({ to, subject, text, html }) {
  const transporter = createEmailTransporter();
  const from = requiredEnv("EMAIL_USER");

  return transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
}
