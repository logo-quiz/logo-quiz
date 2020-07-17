import { UserStateService } from '../../shared/service/user-state.service';
import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { LogoService } from '../../shared/service/logo.service';
import { CreateLogoDto, Logo, LogoVerifyResponse } from '@logo-quiz/models';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { LevelService } from '../../shared/service/level.service';

@Controller('logos')
export class LogoController {
  constructor(
    private readonly logoService: LogoService,
    private readonly userStateService: UserStateService,
    private readonly levelService: LevelService,
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
  async validateGuess(
    @Param('id') id: string,
    @Body() validate: { guess: string },
    @Req() request: Request,
  ): Promise<LogoVerifyResponse> {
    // replace _ for ' '
    const guess = validate.guess.replace(/\_/gi, ' ');
    const logo = await this.logoService.findOne(id);
    const logoObject = logo.toJSON() as Logo;
    const level = await this.levelService.findOne(logoObject.level);
    const status = logoObject.name === guess;
    const user = request['user'];
    let state = await this.userStateService.findByUser(user.id);

    if (status) {
      const isValidated = state.logos.indexOf(logoObject._id) !== -1;
      if (!isValidated) {
        // refresh state with updated logos array
        state = await this.userStateService.insertLogo(user.id, logo);
      }
    }
    return {
      status,
      realImageUrl: status ? logoObject.realImageUrl : '',
      nextLogo: status ? this.logoService.findNextInvalidLogo(logoObject, level, state) : null,
      isGameCompleted: await this.logoService.isGameCompleted(state),
      level: {
        validLogos: await this.logoService.getValidLogos(level, state),
        totalLogos: level.logos.length,
      },
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string, @Req() request: Request): Promise<Logo> {
    const user = request['user'];
    const logo = await this.logoService.findOne(id);
    const logoPayload = logo.toJSON() as Logo;
    let obfuscatedName = logoPayload.name.toLowerCase().replace(/[a-z]/gi, '*');
    obfuscatedName = obfuscatedName.replace(/ /g, '_');
    logoPayload.obfuscatedName = obfuscatedName;
    const validated = await this.userStateService.verifyValidatedLogo(id, user.id);
    if (!validated) {
      delete logoPayload.realImageUrl;
      delete logoPayload.name;
    }
    return logoPayload;
  }
}
