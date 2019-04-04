import { Controller, Get, Post } from '@nestjs/common';
import { LevelService } from '../../shared/service/level.service';
import { CreateLevelDto, Level } from '@logo-quiz/models';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('levels')
export class LevelController {
  constructor(private readonly levelService: LevelService) {
  }

  @Post()
  async create(@Body() createCatDto: CreateLevelDto) {
    return await this.levelService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Level[]> {
    return this.levelService.findAll();
  }
}
