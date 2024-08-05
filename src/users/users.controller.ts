import { Controller, Post, Body, BadRequestException } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { Public } from 'src/decorators/public.decorator'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Post('register')
  @Public()
  async register(@Body() createUserDto: CreateUserDto) {
    const oldUser = await this.usersService.findOne(createUserDto.email)
    if (oldUser) {
      throw new BadRequestException('Такой пользователь уже был зарегистрирован!')
    }
    return await this.usersService.register(createUserDto)
  }
}
