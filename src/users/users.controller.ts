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
    const oldUser = await this.usersService.findOne({ email: createUserDto.email })
    if (oldUser) {
      throw new BadRequestException('Такой пользователь уже был зарегистрирован!')
    }
    return await this.usersService.register(createUserDto)
  }

  @Post(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    try {
      const user = await this.usersService.update(id, updateUserDto, { user: req.user })

      return { status: 'success', message: 'Данные успешно обновлены', user }
    } catch (error) {
      throw new BadRequestException('При обновлении данных пользователя произошла ошибка')
    }
  }

  @Patch(':id/avatar')
  async updateAvatar(@Param('id') id: string, @Body() data, @Request() req) {
    try {
      await this.usersService.updateAvatar(id, data.avatarId, { user: req.user })

      return { status: 'success', message: 'Аватарка успешно изменена' }
    } catch (error) {
      throw new BadRequestException('При обновлении аватарка произошла ошибка')
    }
  }

  @Patch(':id/cleanHistory')
  async cleanHistory(@Param('id') id: string, @Request() req) {
    try {
      await this.usersService.cleanHistory(id, { user: req.user })

      return { status: 'success', message: 'История успешно очищена' }
    } catch (error) {
      throw new BadRequestException('При очистке истории произошла ошибка')
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.usersService.remove(id, { user: req.user })
  }
}
