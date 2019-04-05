import { Inject, Injectable } from '@nestjs/common';
import { CreateLogoDto, Logo } from '@logo-quiz/models';
import { Model } from 'mongoose';

@Injectable()
export class LogoService {
  constructor(@Inject('LOGO_MODEL') private readonly logoModel: Model<Logo>) {
  }

  async create(createLogoDto: CreateLogoDto): Promise<Logo> {
    const createdCat = new this.logoModel(createLogoDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Logo[]> {
    return await this.logoModel.find().exec();
  }

  async findAllByLevel(levelId: string): Promise<Logo[]> {
    return await this.logoModel.find({level: levelId}, '-realLogo -name -level');
  }

  async findOne(id: string): Promise<Logo> {
    return await this.logoModel.findById(id);
  }
}
