import { Document, SchemaTimestampsConfig } from 'mongoose';
import { LogoBase } from './logo-base';
import { Timestampable } from './timestampable';

export interface Logo extends LogoBase, Document, Timestampable {
  _id: string;
  level: string;
  obfuscatedName: string;
  validated?: boolean;
}
