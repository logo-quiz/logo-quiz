import { Schema } from 'mongoose';

export const LevelSchema = new Schema({
  difficulty: Number,
  name: String,
  scoreToUnlock: Number,
  logos: [{ type: Schema.Types.ObjectId, ref: 'Logo' }]
}, { timestamps: true });
