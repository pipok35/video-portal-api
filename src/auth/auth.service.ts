/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from 'src/users/schemas/user.schema'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOne({ email }, { lean: true, select: [ '+password' ] })
    if (!user) {
      throw new UnauthorizedException('Пользователь с таким логином не найден!')
    }
    if (!bcrypt.compareSync(pass, user.password)) {
      throw new UnauthorizedException('Неверный логин или пароль!')
    }
    
    return user
  }

  async login(user: { _id: string, email: string, username: string}): Promise<{ access_token:string }> {
    const payload = { sub: user._id, email: user.email }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
