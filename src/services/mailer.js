const nodemailer = require('nodemailer');
const config = require('../config');

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
        console.log(`Message sent: ${info.messageId}`);
        return info;
    }catch(error) {
        console.error(`Error: ${error.message}`);
        throw new Error('Error sending email');
    }
};

module.exports = {sendEmail};
