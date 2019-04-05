import { Connection } from 'mongoose';
import { LogoSchema } from '../schema/logo';

export const logoProvider = [
  {
    provide: 'LOGO_MODEL',
    useFactory: (connection: Connection) => connection.model('Logo', LogoSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
