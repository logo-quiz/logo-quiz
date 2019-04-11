import { Schema } from 'mongoose';

export const UserCompletedLogoSchema = new Schema({
  state: { type: Schema.Types.ObjectId, ref: 'UserState' },
  logo: [{ type: Schema.Types.ObjectId, ref: 'Logo' }]
});
