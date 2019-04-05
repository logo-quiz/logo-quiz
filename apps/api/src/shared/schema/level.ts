import * as mongoose from 'mongoose';

export const LevelSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  difficulty: Number,
  name: String,
  scoreToUnlock: Number,
  logos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Logo' }]
});
