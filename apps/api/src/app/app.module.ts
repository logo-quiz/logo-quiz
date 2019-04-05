import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '../shared/exception-filter/all.exceptions.filter';
import { LevelModule } from './level/level.module';
import { LogoModule } from './logo/logo.module';

@Module({
  imports: [
    LevelModule,
    LogoModule,
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
