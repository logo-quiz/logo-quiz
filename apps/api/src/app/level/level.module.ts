import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { LevelController } from './level.controller';

@Module({
  imports: [
    SharedModule
  ],
  controllers: [
    LevelController
  ]
})
export class LevelModule {
}
