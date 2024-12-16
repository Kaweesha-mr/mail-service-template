require("dotenv").config();

// Config validation
const requiredEnv = [
  "SMTP_USER",
  "SMTP_PASS",
  "OAuth_CLIENT_ID",
  "OAuth_CLIENT_SECRET",
  "OAuth_REFRESH_TOKEN",
  "OAuth_REDIRECT_URL",
  "DEFAULT_SENDER",
];

requiredEnv.forEach((env) => {
  if (!process.env[env]) {
    throw new Error(`Missing required environment variable: ${env}`);
  }
});

module.exports = {
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  oAuth: {
    clientId: process.env.OAuth_CLIENT_ID,
    clientSecret: process.env.OAuth_CLIENT_SECRET,
    refreshToken: process.env.OAuth_REFRESH_TOKEN,
    redirectUrl: process.env.OAuth_REDIRECT_URL,
  },

  defaultSender: process.env.DEFAULT_SENDER || "kaweesha.mr@gmail.com",
};
