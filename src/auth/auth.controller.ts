import { Controller, Post, Get, Request, UseGuards, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(req.user)
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(@Body() req) {
    return this.authService.register(req)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    return req.user
  }
}
