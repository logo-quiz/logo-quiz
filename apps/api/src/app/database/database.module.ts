import { databaseProviders } from './database.providers';
import { Module } from '@nestjs/common';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders]
})
export class DatabaseModule {
}
