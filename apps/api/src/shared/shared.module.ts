import { Module } from '@nestjs/common';
import { LevelService } from './service/level.service';
import { DatabaseModule } from '../app/database/database.module';
import { levelProvider } from './providers/level.provider';

const providers = [
  ...levelProvider
];

@Module({
  imports: [DatabaseModule],
  providers: [
    ...providers,
    LevelService
  ],
  exports: [
    LevelService,
    DatabaseModule
  ]
})
export class SharedModule {
}
