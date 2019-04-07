import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '../shared/exception-filter/all.exceptions.filter';
import { LevelModule } from './level/level.module';
import { LogoModule } from './logo/logo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    LevelModule,
    LogoModule,
    UserModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ]
})
export class AppModule {
}
