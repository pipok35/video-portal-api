/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, UnauthorizedException  } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOne(username)
    if (!user) {
      throw new UnauthorizedException('Пользователь с таким логином не найден!')
    }
    if (!bcrypt.compareSync(pass, user.password)) {
      throw new UnauthorizedException('Неверный логин или пароль!')
    }
    
    return user
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id }

    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
