const nodemailer = require('nodemailer');
const config = require('../config');
const logger = require('../utils/logger');

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  });


const sendEmail = async (to,subject,html) => {
    try{
        const info = await transporter.sendMail({
            from: config.defaultSender,
            to,
            subject,
            html,
        });
        logger.info(`Sending email to ${to} with subject "${subject}"`);  // Log the email being sent
        return info;
    }catch(error) {
        logger.error(`Error sending email: ${error.message}`);  // Log the error
        throw new Error('Error sending email');
    }
};

module.exports = {sendEmail};
