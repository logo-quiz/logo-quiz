/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory } from '@nestjs/core';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { AppModule } from './app/app.module';

const loggerDefaults = {
  dirname: `./logs/`,
  handleExceptions: true,
  json: false,
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        utilities.format.nestLike(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
          ...loggerDefaults,
          filename: 'error-%DATE%.log',
          level: 'error',
        }),
        new winston.transports.DailyRotateFile({
          ...loggerDefaults,
          filename: 'all-%DATE%.log',
        }),
      ],
    }),
  });
  app.setGlobalPrefix(`api`);
  app.enableCors();
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
}

bootstrap();
