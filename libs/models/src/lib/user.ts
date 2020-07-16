import { Document } from 'mongoose';
import { CreateUserDto } from './create-user.dto';
import { Timestampable } from './timestampable';

export interface User extends CreateUserDto, Document, Timestampable {
  _id: string;
  state: UserState;
  lastAccessAt: Date;
}

export interface UserState extends Document {
  _id: string;
  user: string;
  logos: string[];
}

export interface UserCompletedLogo extends Document {
  _id: string;
  state: string;
  logo: string;
}
