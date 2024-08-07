import { Controller, Post, Body, BadRequestException, Request, Delete, Param, Patch } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { Public } from 'src/decorators/public.decorator'
import { User } from './schemas/user.schema'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Post('register')
  @Public()
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const oldUser = await this.usersService.findOne(createUserDto.email)
    if (oldUser) {
      throw new BadRequestException('Такой пользователь уже был зарегистрирован!')
    }
    return await this.usersService.register(createUserDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req): Promise<User> {
    return this.usersService.update(id, updateUserDto, { user: req.user })
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.usersService.remove(id, { user: req.user })
  }
}
