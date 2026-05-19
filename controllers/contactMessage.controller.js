const contactMessageService = require("../services/contactMessage.service");

async function sendContactMessage(req, res) {
  await contactMessageService.sendContactMessage(req.body);

  res.status(201).json({
    message: "Contact message sent successfully",
  });
}

module.exports = {
  sendContactMessage,
};
