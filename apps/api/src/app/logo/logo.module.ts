import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { LogoController } from './logo.controller';

@Module({
  imports: [
    SharedModule
  ],
  controllers: [
    LogoController
  ]
})
export class LogoModule {
}
