import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: String,
  state: { type: Schema.Types.ObjectId, ref: 'UserState' }
});
