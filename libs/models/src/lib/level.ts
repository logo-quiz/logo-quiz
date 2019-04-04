import { CreateLevelDto } from '@logo-quiz/models';
import { Document } from 'mongoose';

export interface Level extends CreateLevelDto, Document {
  _id: string;
}
