import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '../shared/exception-filter/all.exceptions.filter';
import { LevelModule } from './level/level.module';

@Module({
  imports: [
    LevelModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AppService,
  ],
})
export class AppModule {
}
