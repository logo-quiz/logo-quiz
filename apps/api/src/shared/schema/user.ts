import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: String,
  states: [{ type: Schema.Types.ObjectId, ref: 'UserState' }]
});
