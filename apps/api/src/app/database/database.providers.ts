import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb://root:example@localhost:27017/logo-quiz', { useNewUrlParser: true })
  }
];
