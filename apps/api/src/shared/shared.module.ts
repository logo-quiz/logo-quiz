import { Module } from '@nestjs/common';
import { LevelService } from './service/level.service';
import { DatabaseModule } from '../app/database/database.module';
import { levelProvider } from './providers/level.provider';
import { LogoService } from './service/logo.service';
import { logoProvider } from './providers/logo.provider';
import { userProvider } from './providers/user.provider';
import { userStateProvider } from './providers/user-state.provider';
import { UserService } from './service/user.service';
import { UserStateService } from './service/user-state.service';

const providers = [
  ...levelProvider,
  ...logoProvider,
  ...userStateProvider,
  ...userProvider
];

const services = [
  LevelService,
  LogoService,
  UserService,
  UserStateService
];

@Module({
  imports: [DatabaseModule],
  providers: [
    ...providers,
    ...services
  ],
  exports: [
    ...services,
    DatabaseModule
  ]
})
export class SharedModule {
}
