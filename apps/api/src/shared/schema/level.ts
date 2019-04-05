import { Schema } from 'mongoose';

export const LevelSchema = new Schema({
  id: Schema.Types.ObjectId,
  difficulty: Number,
  name: String,
  scoreToUnlock: Number,
  logos: [{ type: Schema.Types.ObjectId, ref: 'Logo' }]
});
