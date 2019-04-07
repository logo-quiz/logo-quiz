import { Document } from 'mongoose';
import { CreateUserDto } from './create-user.dto';

export interface User extends CreateUserDto, Document {
  _id: string;
  states: UserState[];
}

export interface UserState extends Document {
  _id: string;
  user: string;
  logo: string;
}
