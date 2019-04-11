import { Connection } from 'mongoose';
import { UserStateSchema } from '../schema/user-state';

export const userStateProvider = [
  {
    provide: 'USER_STATE_MODEL',
    useFactory: (connection: Connection) => connection.model('UserState', UserStateSchema),
    inject: ['DATABASE_CONNECTION']
  }
];
