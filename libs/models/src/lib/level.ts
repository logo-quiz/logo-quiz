import { CreateLevelDto } from './create-level.dto';
import { Document } from 'mongoose';
import { Logo } from './logo';
import { Timestampable } from './timestampable';

export interface Level extends CreateLevelDto, Document, Timestampable {
  _id: string;
  logos: Logo[];
}
