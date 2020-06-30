import { Inject, Injectable } from '@nestjs/common';
import { CreateLogoDto, Logo } from '@logo-quiz/models';
import { DocumentQuery, Model } from 'mongoose';

@Injectable()
export class LogoService {
  constructor(@Inject('LOGO_MODEL') private readonly logoModel: Model<Logo>) {}

  async create(createLogoDto: CreateLogoDto): Promise<Logo> {
    const createdLogo = new this.logoModel(createLogoDto);
    return await createdLogo.save();
  }

  async findAll(): Promise<Logo[]> {
    return await this.logoModel
      .find()
      .populate({
        path: 'level',
        select: '-logos'
      })
      .exec();
  }

  async findAllByLevel(levelId: string): Promise<Logo[]> {
    return await this.logoModel.find({ level: levelId }, 'obfuscatedImageUrl').exec();
  }

  async findOne(id: string): Promise<DocumentQuery<Logo | null, Logo, {}> & {}> {
    return this.logoModel.findById(id) as any;
  }
}
