const express = require("express");
const { sendEmail, sendEmailWithAttachment } = require("../services/mailer");
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

module.exports = router;
