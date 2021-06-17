import { Request, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async test() {
    return 'Success!';
  }
}
