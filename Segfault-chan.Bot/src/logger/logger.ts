import pino from 'pino';

const transport = pino.transport({
  targets: [
    {
      target: 'pino-pretty',
      level: 'debug',
      options: {
        translateTime: 'SYS:standard'
      }
    },
    {
      target: 'pino/file',
      level: 'debug',
      options: {
        destination: 'logs/log.json',
        translateTime: 'SYS:standard'
      }
    }
  ]
});

export const logger = pino(transport);
