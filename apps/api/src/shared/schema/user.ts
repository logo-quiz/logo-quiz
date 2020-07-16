import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  state: { type: Schema.Types.ObjectId, ref: 'UserState' },
  lastAccessAt: { type: Date, required: false, default: Date.now },
}, { timestamps: true });
