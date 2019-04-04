import * as mongoose from 'mongoose';

export const LevelSchema = new mongoose.Schema({
  id: String,
  number: Number,
  unlock: Number,
});
