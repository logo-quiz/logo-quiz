import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LogoService } from '../../shared/service/logo.service';
import { CreateLogoDto, Logo } from '@logo-quiz/models';

@Controller('logos')
export class LogoController {
  constructor(private readonly logoService: LogoService) {}

  @Post()
  async create(@Body() createLogoDto: CreateLogoDto) {
    return await this.logoService.create(createLogoDto);
  }

  @Get()
  async findAll(): Promise<Logo[]> {
    return this.logoService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<any> {
    return await this.logoService.findOne(id);
  }
}
