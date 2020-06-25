import * as mongoose from 'mongoose';
import { environment } from '@api/environment';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        environment.dbUri,
        { useNewUrlParser: true }
      )
  }
];
