import * as mongoose from 'mongoose';
import { config } from '../../config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        config.dbUri,
        { useNewUrlParser: true },
      ),
  },
];
