const express = require("express");
const { sendEmail } = require("../services/mailer");
const router = express.Router();

router.post("/send", async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    logger.error("Missing required fields (to, subject, text)"); // Log an error
    return res.status(400).send("All fields (to, subject, text) are required");
  }
  try {
    logger.info(`Sending email to ${to} with subject "${subject}"`); // Log the email being sent
    const info = await sendEmail(to, subject, text);
    res.status(200).json({ message: "Email sent", messageId: info.messageId });
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`); // Log the error
    res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
});

module.exports = router;
