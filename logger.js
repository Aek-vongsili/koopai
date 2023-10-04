const winston = require('winston');

// Define the log format
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

// Create a logger
const logger = winston.createLogger({
  level: 'info', // Set the default log level
  format: logFormat,
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
    new winston.transports.File({ filename: 'combined.log' }) // Log all messages to a separate file
  ],
});

module.exports = logger;