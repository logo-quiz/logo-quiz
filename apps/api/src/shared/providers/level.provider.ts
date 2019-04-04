import { Connection } from 'mongoose';
import { LevelSchema } from '../schema/level';

export const levelProvider = [
  {
    provide: 'LEVEL_MODEL',
    useFactory: (connection: Connection) => connection.model('Level', LevelSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
