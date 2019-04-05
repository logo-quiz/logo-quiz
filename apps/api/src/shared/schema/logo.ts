import * as mongoose from 'mongoose';

export const LogoSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  obfuscatedLogo: String,
  realLogo: String,
  name: String,
  letters: String,
  level: {type: mongoose.Schema.Types.ObjectId, ref: 'Level'},
});
