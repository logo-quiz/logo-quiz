import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LevelService } from '../../shared/service/level.service';
import { CreateLevelDto, Level, Logo, User } from '@logo-quiz/models';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { UserStateService } from '../../shared/service/user-state.service';
import { CurrentUser } from '../../shared/decorators/user.decorator';

@Controller('levels')
export class LevelController {
  constructor(
    private readonly levelService: LevelService,
    private readonly userStateService: UserStateService
  ) {}

  @Post()
  async create(@Body() createLevelDto: CreateLevelDto) {
    return await this.levelService.create(createLevelDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@CurrentUser() user: User): Promise<Level[]> {
    const levels = await this.levelService.findAll();
    const userLogos = await this.userStateService.getUserLogos(user.id);
    return levels.map(level => {
      const levelPayload = level.toJSON();
      levelPayload.logos = this.validatedLogos(level, userLogos);
      return levelPayload;
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string, @CurrentUser() user: User): Promise<Level> {
    const level = await this.levelService.findOne(id, 'obfuscatedImageUrl realImageUrl');
    const userLogos = await this.userStateService.getUserLogos(user.id);
    // loop the list of logos and change its 'validated' status according to the userState
    const newLogos = this.validatedLogos(level, userLogos);

    // TODO: This looks a bit hacky, maybe find a way to improve this. What we're doing here is
    // to fetch a level and then change the 'validated' property of each of its logos according to
    // the user state. That 'toJSON' doesn't look like it's the right thing to do.
    const levelPayload = level.toJSON();
    levelPayload.logos = newLogos;
    return levelPayload;
  }

  private validatedLogos(level: Level, userLogos: string[]): Logo[] {
    return level.logos.map(logo => {
      const logoPayload = logo.toJSON() as Logo;
      logoPayload.validated = userLogos.indexOf(logo.id) !== -1;
      if (!logoPayload.validated) {
        delete logoPayload.realImageUrl;
      }
      return logoPayload;
    });
  }
}
