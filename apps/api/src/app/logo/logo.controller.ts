import { UserStateService } from '../../shared/service/user-state.service';
import { Body, Controller, Get, Param, Post, UseGuards, Req } from '@nestjs/common';
import { LogoService } from '../../shared/service/logo.service';
import { CreateLogoDto, Logo } from '@logo-quiz/models';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';

@Controller('logos')
export class LogoController {
  constructor(
    private readonly logoService: LogoService,
    private readonly userStateService: UserStateService
  ) {}

  @Post()
  async create(@Body() createLogoDto: CreateLogoDto) {
    return await this.logoService.create(createLogoDto);
  }

  @Get()
  async findAll(): Promise<Logo[]> {
    return this.logoService.findAll();
  }

  // TODO: create an interface for the body type like "@Body() validate: ValidationPayload"
  @Post(':id/validate')
  @UseGuards(JwtAuthGuard)
  async validateGuess(@Param('id') id: string, @Body() validate: { guess: string }, @Req() request: Request) {
    const guess = validate.guess;
    const logo = await this.logoService.findOne(id);
    const status = logo.name === guess;
    const user = request['user'];
    const state = await this.userStateService.findByUser(user.id);
    if (status) {
      const isValidated = state.logos.indexOf(logo.id) !== -1;
      if (!isValidated) {
        await this.userStateService.insertLogo(user.id, logo);
      }
    }
    return { status };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string, @Req() request: Request): Promise<Logo> {
    const user = request['user'];
    const logo = await this.logoService.findOne(id);
    const logoPayload = logo.toJSON() as Logo;
    let obfuscatedName = logoPayload.name.replace(/\w/gi, '*');
    obfuscatedName = obfuscatedName.replace(/ /g, '_');
    logoPayload.obfuscatedName = obfuscatedName;
    const validated = await this.userStateService.verifyValidatedLogo(id, user.id);
    console.log(validated);
    if (!validated) {
      delete logoPayload.realImageUrl;
      delete logoPayload.name;
    }
    return logoPayload;
  }
}
