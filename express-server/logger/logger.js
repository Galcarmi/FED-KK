const winston = require('winston');

function createLogger() {
  const loggerInstance = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'todos-service' },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

  return loggerInstance;
}

module.exports = {
  logger : createLogger()
}

