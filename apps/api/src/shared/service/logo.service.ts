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
    // if all logos are valid
    if (state.logos.length === level.logos.length) {
      return null;
    }

    let nextLogo: Logo = null;
    // find index of next logo
    let index = level.logos.findIndex(item => item._id.toString() === currentLogo._id.toString()) + 1;
    let loop = 0;

    while (nextLogo === null && loop < level.logos.length) {
      // make sure index is never bigger than index array
      index = index >= level.logos.length ? 0 : index;
      const item: Logo = level.logos[index].toJSON() as Logo;

      // comparing with toString() is necessary, otherwise the comparison doesn't work
      if (item._id.toString() !== currentLogo._id.toString() &&
        !state.logos.includes(item._id)) {
        nextLogo = item;
      }
      index++;
      loop++;
    }

    return nextLogo;
  }
}
