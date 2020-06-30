import { Inject, Injectable } from '@nestjs/common';
import { CreateLevelDto, Level } from '@logo-quiz/models';
import { Model } from 'mongoose';
import { LogoService } from './logo.service';

@Injectable()
export class LevelService {
  constructor(
    @Inject('LEVEL_MODEL') private readonly levelModel: Model<Level>,
    private logoService: LogoService,
  ) {}

  async create(createLevelDto: CreateLevelDto): Promise<Level> {
    const createdCat = new this.levelModel(createLevelDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Level[]> {
    const levels = await this.levelModel.find().exec();
    for (const level of levels) {
      level.logos = await this.logoService.findAllByLevel(level.id);
    }
    return levels;
  }

  async findOne(id: string, projection: string = 'obfuscatedImageUrl'): Promise<Level> {
    const level = await this.levelModel.findById(id);
    level.logos = await this.logoService.findAllByLevel(id, projection);
    return level;
  }
}
