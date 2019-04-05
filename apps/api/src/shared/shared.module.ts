import { Module } from '@nestjs/common';
import { LevelService } from './service/level.service';
import { DatabaseModule } from '../app/database/database.module';
import { levelProvider } from './providers/level.provider';
import { LogoService } from './service/logo.service';
import { logoProvider } from './providers/logo.provider';

const providers = [
  ...levelProvider,
  ...logoProvider
];

@Module({
  imports: [DatabaseModule],
  providers: [
    ...providers,
    LevelService,
    LogoService
  ],
  exports: [
    LevelService,
    LogoService,
    DatabaseModule
  ]
})
export class SharedModule {
}
