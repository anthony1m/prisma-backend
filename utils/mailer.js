const nodemailer = require("nodemailer");

function smtpSecure() {
  return String(process.env.SMTP_SECURE).toLowerCase() === "true";
}

function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required in .env`);
  }

  return value;
}

function createTransporter() {
  return nodemailer.createTransport({
    host: requireEnv("SMTP_HOST"),
    port: Number(process.env.SMTP_PORT || 587),
    secure: smtpSecure(),
    auth: {
      user: requireEnv("SMTP_USER"),
      pass: requireEnv("SMTP_PASS"),
    },
  });
}

async function sendMail({ to, subject, text, html, replyTo }) {
  const transporter = createTransporter();

  return transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: to || requireEnv("MAIL_TO"),
    subject,
    text,
    html,
    replyTo,
  });
}

module.exports = {
  sendMail,
};
