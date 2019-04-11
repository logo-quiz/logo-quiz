import { Connection } from 'mongoose';
import { UserCompletedLogoSchema } from '../schema/user-completed-logo';

export const userCompletedLogoProvider = [
  {
    provide: 'USER_COMPLETED_LOGO_MODEL',
    useFactory: (connection: Connection) => connection.model('UserCompletedLogo', UserCompletedLogoSchema),
    inject: ['DATABASE_CONNECTION']
  }
];
