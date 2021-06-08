import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);

    const payload = {
      userId: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: [{
        id: user.id,
        user: user.username,
        isAdmin: user.isAdmin
      }]
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { username, password } = authLoginDto;

    const user = await this.usersService.findByUsername(username);
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }

    return user;
  }
}