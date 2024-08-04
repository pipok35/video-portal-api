import { Controller, Post, Get, Request, UseGuards, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { Public } from 'src/decorators/public.decorator'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const jwt = await this.authService.login(req.user)
    res.cookie('access_token', jwt.access_token, {
      httpOnly: true,
      secure: true
    })

    return res.send(jwt)
  }

  @Get('me')
  me(@Request() req) {
    return req.user
  }
}
