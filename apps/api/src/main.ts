/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory } from '@nestjs/core';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { AppModule } from './app/app.module';
import * as Airbrake from '@airbrake/node';
import * as  airbrakeExpress from '@airbrake/node/dist/instrumentation/express';
import { config } from './config';

const loggerDefaults = {
  dirname: `./logs/`,
  handleExceptions: true,
  json: false,
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
};

async function bootstrap() {
  const airbrake = new Airbrake.Notifier({
    ...config.airBreak,
    environment: config.environment,
  });

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
  app.use(airbrakeExpress.makeMiddleware(airbrake));
  app.setGlobalPrefix(`api`);
  app.enableCors();
  app.use(airbrakeExpress.makeErrorHandler(airbrake));

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
}

bootstrap();
