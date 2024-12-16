require('dotenv').config();

module.exports = {
    smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    defaultSender: process.env.DEFAULT_SENDER || 'no-reply@example.com',
}