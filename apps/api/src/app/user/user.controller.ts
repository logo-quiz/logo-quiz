import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../../shared/service/user.service';
import { UserLogo } from '@logo-quiz/models';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId/level/:levelId/logos')
  findLevelLogos(
    @Param('userId') userId: string,
    @Param('levelId') levelId: string
  ): Promise<UserLogo[]> {
    return this.userService.getLevelLogos(userId, levelId);
  }
}
