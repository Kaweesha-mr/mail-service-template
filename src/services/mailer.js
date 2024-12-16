const nodemailer = require("nodemailer");
const config = require("../config");
const { google } = require("googleapis");
const logger = require("../utils/logger");

// Initialize OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  config.oAuth.clientId,
  config.oAuth.clientSecret,
  config.oAuth.redirectUrl
);
oAuth2Client.setCredentials({ refresh_token: config.oAuth.refreshToken });

// Function to create Nodemailer transporter
const createTransporter = async () => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: config.smtp.user,
        clientId: config.oAuth.clientId,
        clientSecret: config.oAuth.clientSecret,
        refreshToken: config.oAuth.refreshToken,
        accessToken: accessToken.token,
      },
    });
  } catch (error) {
    //display actual error
    console.log(error);
  }
};

// Function to send email
const sendEmail = async (to, subject, html) => {
  try {
    const transporter = await createTransporter(); // Ensure fresh transporter for every email
    const info = await transporter.sendMail({
      from: config.defaultSender,
      to,
      subject,
      html,
    });

    logger.info(`Email sent to ${to} with subject "${subject}"`);
    return info;
  } catch (error) {
    logger.error(`Error sending email to ${to}: ${error.message}`);
    console.log(error);
    throw new Error("Error sending email");
  }
};

//function to send email with attactment
const sendEmailWithAttachment = async (to, subject, html, attachmentPath) => {
  try {
    const transporter = await createTransporter();
    const mailOptions = {
      from: config.defaultSender,
      to,
      subject,
      html,
      attachments: [
        {
          filename: "1.pdf",
          path: attachmentPath,
          contentType: "application/pdf",
        },
      ],
    };
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${to} with subject "${subject}"`);
    return info;
  } catch (error) {
    logger.error(`Error sending email to ${to}: ${error.message}`);
    console.log(error);
    throw new Error("Error sending email");
  }
};

module.exports = { sendEmail, sendEmailWithAttachment };
