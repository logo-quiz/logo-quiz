import { CreateLogoDto } from './create-logo.dto';
import { Document } from 'mongoose';

export interface Logo extends CreateLogoDto, Document {
  _id: string;
}
