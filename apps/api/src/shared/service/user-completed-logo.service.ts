import { Inject, Injectable } from '@nestjs/common';
import { UserCompletedLogo } from '@logo-quiz/models';
import { Model } from 'mongoose';

@Injectable()
export class UserCompletedLogoService {
  constructor(
    @Inject('USER_COMPLETED_LOGO_MODEL')
    private readonly userCompletedLogoModel: Model<UserCompletedLogo>) {
  }

  async insert(stateId: string, logoId: string): Promise<UserCompletedLogo> {
    const instance = new this.userCompletedLogoModel({
      state: stateId,
      logo: logoId
    });

    return await instance.save();
  }

  findByState(stateId: string): Promise<UserCompletedLogo[]> {
    return this.userCompletedLogoModel.find({ state: stateId }).exec();
  }
}
