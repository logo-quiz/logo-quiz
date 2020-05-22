import { SharedModule } from '../../shared/shared.module';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from '../../shared/service/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../../config';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.session.secret
    }),
    UserModule,
    SharedModule
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
