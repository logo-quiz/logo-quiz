import { Body, Controller, Get, Param, Post, UseGuards, Req } from '@nestjs/common';
import { LevelService } from '../../shared/service/level.service';
import { CreateLevelDto, Level } from '@logo-quiz/models';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { UserStateService } from '../../shared/service/user-state.service';

@Controller('levels')
export class LevelController {
  constructor(private readonly levelService: LevelService,
              private readonly userStateService: UserStateService) {}

  @Post()
  async create(@Body() createLevelDto: CreateLevelDto) {
    return await this.levelService.create(createLevelDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() request: Request): Promise<Level[]> {
    console.log(request['user']) // user comes in request.user
    return this.levelService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string, @Req() request: Request): Promise<Level> {
    const level = await this.levelService.findOne(id);
    const user = request['user'];
    const userLogos = await this.userStateService.getUserLogos(user.id);
    // loop the list of logos and change its 'validated' status according to the userState
    const newLogos = level.logos.map(logo => {
      const logoPayload = logo.toJSON();
      logoPayload.validated = userLogos.indexOf(logo.id) !== -1;
      return logoPayload;
    });

    // TODO: This looks a bit hacky, maybe find a way to improve this. What we're doing here is
    // to fetch a level and then change the 'validated' property of each of its logos according to
    // the user state. That 'toJSON' doesn't look like it's the right thing to do.
    const levelPayload = level.toJSON();
    levelPayload.logos = newLogos;
    return levelPayload;
  }
}
