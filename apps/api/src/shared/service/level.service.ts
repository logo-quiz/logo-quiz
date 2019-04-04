import { Inject, Injectable } from '@nestjs/common';
import { CreateLevelDto, Level } from '@logo-quiz/models';
import { Model } from 'mongoose';

@Injectable()
export class LevelService {
  constructor(@Inject('LEVEL_MODEL') private readonly levelModel: Model<Level>) {
  }

  async create(createLevelDto: CreateLevelDto): Promise<Level> {
    const createdCat = new this.levelModel(createLevelDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Level[]> {
    return await this.levelModel.find().exec();
  }
}
