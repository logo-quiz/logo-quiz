import { CreateLevelDto } from './create-level.dto';
import { Document } from 'mongoose';
import { Logo } from './logo';

export interface Level extends CreateLevelDto, Document {
  _id: string;
  logos: Logo[];
}
