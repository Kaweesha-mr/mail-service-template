const express = require("express");
const { sendEmail, sendEmailWithAttachment, sendGreetingEmail,sendResetPasswordEmail,sendActivationEmail } = require("../services/mailer");
const router = express.Router();
const logger = require("../utils/logger");

router.post("/send", async (req, res) => {
  const { to, subject, text } = req.body;

  // Validation
  if (!to || !subject || !text) {
    logger.error("Missing required fields (to, subject, text)"); // Log an error
    return res.status(400).send("All fields (to, subject, text) are required");
  }

  try {
    const info = await sendEmail(to, subject, text);
    res.status(200).json({ message: "Email sent", messageId: info.messageId });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
});


router.post("/sendWithAttachment", async (req, res) => {

  const { to, subject, text,path } = req.body;

    // Validation
    if (!to || !subject || !text || !path) {
      logger.error("Missing required fields (to, subject, text)"); // Log an error
      return res.status(400).send("All fields (to, subject, text) are required");
    }

    try{
      const info = await sendEmailWithAttachment(to, subject, text,path);
      res.status(200).json({ message: "Email sent", messageId: info.messageId });
    }
    catch (error) {
      res
        .status(500)
        .json({ message: "Error sending email", error: error.message });
    }
});

router.post("/greetings", async (req, res) => {
  const { to,name } = req.body;

  // Validation
  if (!to || !name) {
    logger.error("Missing required field (to)"); // Log an error
    return res.status(400).send("Field (to) is required");
  }

  try {
    const info = await sendGreetingEmail(to,name);
    res.status(200).json({ message: "Email sent", messageId: info.messageId });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
});


router.post("/activation", async (req, res) => {
  const { to, name, activationLink } = req.body;

  // Validation
  if (!to || !name || !activationLink) {
    logger.error("Missing required fields (to, name, activationLink)"); // Log an error
    return res.status(400).send("All fields (to, name, activationLink) are required");
  }

  try {
    const info = await sendActivationEmail(to, name, activationLink);
    res.status(200).json({ message: "Email sent", messageId: info.messageId });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
});

router.post("/reset-password", async (req, res) => {
  const { to, name, resetLink } = req.body;

  // Validation
  if (!to || !name || !resetLink) {
    logger.error("Missing required fields (to, name, resetLink)"); // Log an error
    return res.status(400).send("All fields (to, name, resetLink) are required");
  }

  try {
    const info = await sendResetPasswordEmail(to, name, resetLink);
    res.status(200).json({ message: "Email sent", messageId: info.messageId });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
});

module.exports = router;
