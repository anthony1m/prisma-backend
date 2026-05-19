const { sendMail } = require("../utils/mailer");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildTextMessage(data) {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    "",
    "Message:",
    data.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function buildHtmlMessage(data) {
  const phoneLine = data.phone
    ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>`
    : "";

  return `
    <h2>New contact message</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    ${phoneLine}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
  `;
}

async function sendContactMessage(data) {
  await sendMail({
    subject: data.subject || "New contact message",
    text: buildTextMessage(data),
    html: buildHtmlMessage(data),
    replyTo: data.email,
  });
}

module.exports = {
  sendContactMessage,
};
