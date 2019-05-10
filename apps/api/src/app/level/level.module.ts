import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { LevelController } from './level.controller';

@Module({
  imports: [
    AuthModule,
    SharedModule
  ],
  controllers: [
    LevelController
  ]
})
export class LevelModule {
}
