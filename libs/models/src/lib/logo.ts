import { Document } from 'mongoose';
import { Level } from '@logo-quiz/models';
import { LogoBase } from './logo-base';

export interface Logo extends LogoBase, Document {
  _id: string;
  level: Level;
  obfuscatedName: string;
}
