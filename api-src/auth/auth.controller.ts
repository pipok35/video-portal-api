import { Controller, Post, Get, Request, UseGuards, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { Public } from 'api-src/decorators/public.decorator'
import { Response } from 'express'
import { UsersService } from '../users/users.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

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
  async me(@Request() req) {
    const user = await this.usersService.findOne({ _id: req.user }, { populates: [ 'videoHistory' ] })
    return user
  }
}
