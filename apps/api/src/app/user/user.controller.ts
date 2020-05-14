import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from '../../shared/service/user.service';
import { UserLogo } from '@logo-quiz/models';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() credentials: { email: string; password: string }) {
    return this.userService.signup(credentials);
  }
}
