import { SharedModule } from '../../shared/shared.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  imports: [
    SharedModule
  ],
  controllers: [
    UserController
  ],
  providers:[]
})
export class UserModule {
}
