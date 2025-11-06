// utils/logger.js
const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFile = path.join(logsDir, `app-${new Date().toISOString().split('T')[0]}.log`);

const logger = {
  info: (message) => {
    const logMessage = `[${new Date().toISOString()}] [INFO] ${typeof message === 'object' ? JSON.stringify(message) : message}\n`;
    console.log(logMessage);
    fs.appendFileSync(logFile, logMessage);
  },
  
  error: (message) => {
    const logMessage = `[${new Date().toISOString()}] [ERROR] ${typeof message === 'object' ? JSON.stringify(message) : message}\n`;
    console.error(logMessage);
    fs.appendFileSync(logFile, logMessage);
  },
  
  warn: (message) => {
    const logMessage = `[${new Date().toISOString()}] [WARN] ${typeof message === 'object' ? JSON.stringify(message) : message}\n`;
    console.warn(logMessage);
    fs.appendFileSync(logFile, logMessage);
  }
};

module.exports = logger;
