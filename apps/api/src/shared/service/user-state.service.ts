import { Inject, Injectable } from '@nestjs/common';
import { UserState } from '@logo-quiz/models';
import { Model } from 'mongoose';
import { UserCompletedLogoService } from './user-completed-logo.service';

@Injectable()
export class UserStateService {
  constructor(@Inject('USER_STATE_MODEL') private readonly userStateModel: Model<UserState>,
              private userCompletedLogoService: UserCompletedLogoService) {
  }

  async insert(userId: string): Promise<UserState> {
    const instance = new this.userStateModel({
      user: userId
    });

    return await instance.save();
  }

  async findByUser(userId: string): Promise<UserState> {
    const state: UserState = await this.userStateModel.findOne({ user: userId }).exec();
    if (state) {
      state.logos = await this.userCompletedLogoService.findByState(state._id);
    }
    return state;
  }
}
