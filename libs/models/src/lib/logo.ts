import { Document } from 'mongoose';
import { LogoBase } from './logo-base';

export interface Logo extends LogoBase, Document {
  _id: string;
  level: string;
  obfuscatedName: string;
  validated?: boolean;
}
