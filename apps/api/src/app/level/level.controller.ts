import { LogoService } from './../../shared/service/logo.service';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LevelService } from '../../shared/service/level.service';
import { CreateLevelDto, Level } from '@logo-quiz/models';

@Controller('levels')
export class LevelController {
  constructor(
    private readonly levelService: LevelService,
    private readonly logoService: LogoService,
  ) { }

  @Post()
  async create(@Body() createLevelDto: CreateLevelDto) {
    return await this.levelService.create(createLevelDto);
  }

  @Get()
  async findAll(): Promise<Level[]> {
    return this.levelService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Level> {
    const level = await this.levelService.findOne(id);
    level.logos = await this.logoService.findAllByLevel(id);
    return level;
  }
}
