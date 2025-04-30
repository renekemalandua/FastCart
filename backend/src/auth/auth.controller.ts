import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body('email') email: string) {
    return this.authService.login(email);
  }

  @Post('logout')
  logout(@Param('sessionId') sessionId: string) {
    return this.authService.logout(sessionId);
  }

  @Get('me/:sessionId')
  async getMe(@Param('sessionId') sessionId: string) {
    return this.authService.getMe(sessionId);
  }
}