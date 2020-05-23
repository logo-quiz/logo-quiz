import { Inject, Injectable } from '@nestjs/common';
import { CreateLevelDto, Level } from '@logo-quiz/models';
import { Model } from 'mongoose';
import { LogoService } from './logo.service';

@Injectable()
export class LevelService {
  constructor(
    @Inject('LEVEL_MODEL') private readonly levelModel: Model<Level>,
    private logoService: LogoService
  ) {}

  async create(createLevelDto: CreateLevelDto): Promise<Level> {
    const createdCat = new this.levelModel(createLevelDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Level[]> {
    const levels = await this.levelModel.find().exec();
    levels.forEach(async level => {
      level.logos = await this.logoService.findAllByLevel(level.id);
    });
    return levels;
  }

  async findOne(id: string): Promise<Level> {
    const level = await this.levelModel.findById(id);
    level.logos = await this.logoService.findAllByLevel(id);
    return level;
  }
}
