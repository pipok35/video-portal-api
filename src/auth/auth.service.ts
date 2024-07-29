import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username)
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId }
    console.log(payload)
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async register(user: any) {
    const hashedPassword = bcrypt.hashSync(user.password, 10)
    const newUser = await this.usersService.create({
      ...user,
      password: hashedPassword,
    })
    return newUser
  }

  async getUserFromToken(token: string): Promise<any> {
    const decoded = this.jwtService.decode(token) as any
    return this.usersService.findOne(decoded.username)
  }
}
