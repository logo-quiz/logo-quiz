import { Inject, Injectable } from '@nestjs/common';
import { UserState } from '@logo-quiz/models';
import { Model } from 'mongoose';

@Injectable()
export class UserStateService {
  constructor(@Inject('USER_STATE_MODEL') private readonly userStateModel: Model<UserState>) {
  }

  async insertState(userId: string, logoId: string): Promise<UserState> {
    const instance = new this.userStateModel({
      user: userId,
      logo: logoId
    });

    console.log(instance);
    return await instance.save();
  }

  async findAllByUser(userId: string): Promise<UserState[]> {
    return await this.userStateModel.find({ user: userId }).exec();
  }
}
