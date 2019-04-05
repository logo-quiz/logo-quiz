import { Schema } from 'mongoose';

export const LogoSchema = new Schema({
  id: Schema.Types.ObjectId,
  obfuscatedLogo: String,
  realLogo: String,
  name: String,
  letters: String,
  level: {type: Schema.Types.ObjectId, ref: 'Level'},
});
