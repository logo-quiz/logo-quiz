import { Body, Controller, Get, Param, Post, UseGuards, Req } from '@nestjs/common';
import { LevelService } from '../../shared/service/level.service';
import { CreateLevelDto, Level } from '@logo-quiz/models';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';

@Controller('levels')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

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
  async findById(@Param('id') id: string): Promise<Level> {
    return await this.levelService.findOne(id);
  }
}
