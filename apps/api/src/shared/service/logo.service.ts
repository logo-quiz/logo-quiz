import { Inject, Injectable } from '@nestjs/common';
import { CreateLogoDto, Level, Logo, UserState } from '@logo-quiz/models';
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
      select: '-logos',
    })
    .exec();
  }

  async findAllByLevel(levelId: string, projection: string = 'obfuscatedImageUrl'): Promise<Logo[]> {
    return await this.logoModel.find({ level: levelId }, projection).exec();
  }

  async findOne(id: string): Promise<DocumentQuery<Logo | null, Logo, {}> & {}> {
    return this.logoModel.findById(id) as any;
  }

  findNextInvalidLogo(currentLogo: Logo, level: Level, state: UserState): Logo {
    let nextLogo: Logo = null;
    // find index of next logo
    let index = level.logos.findIndex(item => item._id.toString() === currentLogo._id.toString()) + 1;
    let loop = 0;

    while (nextLogo === null && loop < level.logos.length) {
      // make sure index is never bigger than index array
      index = index >= level.logos.length ? 0 : index;
      const item: Logo = level.logos[index].toJSON() as Logo;

      // comparing with toString() is necessary, otherwise the comparison doesn't work
      if (!state.logos.includes(item._id)) {
        nextLogo = item;
      }
      index++;
      loop++;
    }

    return nextLogo;
  }

  async findAllCount(): Promise<number> {
    return this.logoModel
    .countDocuments();
  }

  async isGameCompleted(state: UserState): Promise<boolean> {
    return (await this.findAllCount()) === state.logos.length;
  }

  async getValidLogos(level: Level, state: UserState): Promise<number> {
    return level.logos.reduce((total: number, logo: Logo) => {
      return state.logos.includes(logo._id) ? ++total : total;
    }, 0);
  }
}
