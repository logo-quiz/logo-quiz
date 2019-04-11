import { Connection } from 'mongoose';
import { UserSchema } from '../schema/user';

export const userProvider = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION']
  }
];
