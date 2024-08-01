import { Controller, Post, Body, BadRequestException } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/createUser.dto'
import { Public } from 'src/decorators/public.decorator'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Post('register')
  @Public()
  async register(@Body() createUserDto: CreateUserDto) {
    const oldUser = await this.usersService.findOne(createUserDto.username)
    if (oldUser) {
      throw new BadRequestException('Такой пользователь уже был зарегистрирован!')
    }
    return this.usersService.register(createUserDto)
  }
}
