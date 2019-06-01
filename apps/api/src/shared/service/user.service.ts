import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, Logo, User, UserLogo } from '@logo-quiz/models';
import { Model } from 'mongoose';
import { UserStateService } from './user-state.service';
import { LevelService } from './level.service';
import { passwordHash } from '../utils/password-hash';

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>,
              private userStateService: UserStateService,
              private levelService: LevelService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const instance = new this.userModel(createUserDto);
    return await instance.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user: User = await this.userModel.findById(id);
    user.state = await this.userStateService.findByUser(id);
    return user;
  }

  async login(credentials: { email: string, password: string }) {
    const user = await this.userModel.findOne({
			email: credentials.email,
			password: passwordHash(credentials.password)
		});

		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
  }

  async signup(credentials: { email: string, password: string }) {
    // TODO make sure user doesn't exist before adding it to the DB
    const user = {
      email: credentials.email,
      password: passwordHash(credentials.password)
    }
    const instance = new this.userModel(user);
    return await instance.save();
  }

  async getLevelLogos(userId: string, levelId: string): Promise<UserLogo[]> {
    const user = await this.findOne(userId);
    const level = await this.levelService.findOne(levelId);
    return await level.logos.map((logo: Logo) => {
      const completed = user.state.logos
      .findIndex((state) => state.logo.toString() === logo._id.toString()) !== -1;
      return {
        _id: logo._id,
        imageUrl: completed ? logo.realImageUrl : logo.obfuscatedImageUrl,
        completed
      };
    });
  }
}
