import { Document } from 'mongoose';
import { CreateUserDto } from './create-user.dto';

export interface User extends CreateUserDto, Document {
  _id: string;
  state: UserState;
}

export interface UserState extends Document {
  _id: string;
  user: string;
  logos: UserCompletedLogo[];
}

export interface UserCompletedLogo extends Document {
  _id: string;
  state: string;
  logo: string;
}
