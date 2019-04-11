import { Schema } from 'mongoose';

export const LogoSchema = new Schema({
  obfuscatedLogoUrl: String,
  realLogoUrl: String,
  name: String,
  letters: String,
  level: {type: Schema.Types.ObjectId, ref: 'Level'},
});
