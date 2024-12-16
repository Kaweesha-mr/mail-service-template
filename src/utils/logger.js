const winston = require("winston");

const level = process.env.NODE_ENV === "production" ? "error" : "info";

const logger = winston.createLogger({
  level: level, // Use the level based on the environment
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/mailer-service.log" }),
  ],
});


module.exports = logger;
