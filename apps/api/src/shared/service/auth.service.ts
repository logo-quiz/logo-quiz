import { config } from './../../config';
import { UserService } from './user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private userService: UserService) {}

  async createToken(credentials: {email: string, password: string}) {
		const user = await this.userService.login(credentials);
		return {
      token: this.jwtService.sign({id: user.id})
    };
  }

  async verifyToken(token: string) {
		return new Promise(resolve => {
			jwt.verify(token, config.session.secret, decoded => resolve(decoded));
		});
  }
  
  async validateUser(payload: JwtPayload): Promise<any> {
		return await this.userService.findOne(payload.id);
	}
}
