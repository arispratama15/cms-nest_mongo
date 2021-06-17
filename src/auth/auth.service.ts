import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(user: User) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user: [
        {
          id: user.id,
          user: user.username,
          isAdmin: user.isAdmin,
        },
      ],
    };
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (valid) {
      return user;
    }

    return null;
  }
}
