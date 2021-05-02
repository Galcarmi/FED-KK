import winston from 'winston';

function createLogger(): winston.Logger {
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

export const logger: winston.Logger = createLogger();
