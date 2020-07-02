import { AuthModule } from './auth/auth.module';
import { Logger, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from '../shared/exception-filter/all.exceptions.filter';
import { LevelModule } from './level/level.module';
import { LogoModule } from './logo/logo.module';
import { UserModule } from './user/user.module';
import { LoggerInterceptor } from '../shared/interceptors/logger.interceptor';

@Module({
  imports: [
    LevelModule,
    LogoModule,
    UserModule,
    AuthModule,
  ],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }, {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {
}
