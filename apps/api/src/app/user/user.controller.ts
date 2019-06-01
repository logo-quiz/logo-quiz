import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from '../../shared/service/user.service';
import { UserLogo } from '@logo-quiz/models';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId/levels/:levelId/logos')
  findLevelLogos(
    @Param('userId') userId: string,
    @Param('levelId') levelId: string
  ): Promise<UserLogo[]> {
    return this.userService.getLevelLogos(userId, levelId);
  }

  @Post()
  createUser(@Body() credentials: {email: string, password: string}) {
    return this.userService.signup(credentials);
  }
}
