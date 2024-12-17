const nodemailer = require("nodemailer");
const config = require("../config");
const { google } = require("googleapis");
const logger = require("../utils/logger");
const fs = require("fs");
const path = require("path");
const mjml = require('mjml');

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
    const transporter = nodemailer.createTransport({
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

    // Dynamically import nodemailer-express-handlebars
    const nodemailerExpressHandlebars = await import("nodemailer-express-handlebars");

    // Use handlebars for templating
    transporter.use(
      "compile",
      nodemailerExpressHandlebars.default({
        viewEngine: {
          extname: ".hbs", // Template extension
          partialsDir: path.resolve("./src/templates"), // Path to your templates folder
          defaultLayout: false, // Disable layout support
        },
        viewPath: path.resolve("./src/templates"), // Correct path to the templates folder
      })
    );

    return transporter;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating transporter");
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

const sendEmailWithAttachments = async (to, subject, html, attachmentPaths) => {
  try {
    const transporter = await createTransporter();

    // Convert the comma-separated file paths into an array of attachment objects
    const attachments = attachmentPaths.split(",").map((path, index) => ({
      filename: `attachment-${index + 1}.pdf`, // Adjust filename logic if needed
      content: fs.createReadStream(path.trim()), // Trim to handle extra spaces
    }));

    const mailOptions = {
      from: config.defaultSender,
      to,
      subject,
      html,
      attachments,
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

const sendGreetingEmail = async (to, name) => {
  try {
    const transporter = await createTransporter();
    const companyLogo = "https://upload.wikimedia.org/wikipedia/commons/a/a0/New_Logo_of_SLIIT.png";

    const mjmlTemplatePath = path.resolve('./src/templates/greetings.mjml');
    const mjmlTemplate = fs.readFileSync(mjmlTemplatePath, 'utf-8');

  
    const compiledMjmlTemplate = mjmlTemplate
      .replace('{{companyLogo}}', companyLogo)
      .replace('{{name}}', name);


    const { html, errors } = mjml(compiledMjmlTemplate);
    if (errors && errors.length) {
      throw new Error(`MJML compilation error: ${errors[0].message}`);
    }


    const mailOptions = {
      from: config.defaultSender,
      to,
      subject: "Welcome to our platform",
      html: html, 
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Greeting email sent to ${to} with subject "${mailOptions.subject}"`);
    return info;
  } catch (error) {
    logger.error(`Error sending email to ${to}: ${error.message}`);
    console.log(error);
    throw new Error("Error sending email");
  }
};


module.exports = { sendEmail, sendEmailWithAttachments, sendGreetingEmail };
