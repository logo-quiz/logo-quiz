import { Schema } from 'mongoose';

export const UserStateSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  logo: { type: Schema.Types.ObjectId, ref: 'Logo' }
});
