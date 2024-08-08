/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcryptjs'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto)

    return createdUser.save()
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10)
    const newUser = this.create({
      ...createUserDto,
      password: hashedPassword
    })

    return newUser
  }

  async findOne(conditions: object, options?): Promise<UserDocument> {
    const user = this.userModel.findOne(conditions)
    if (!user) {
      throw new NotFoundException('Пользователь не найден!')
    }
    if (Array.isArray(options?.populates)) {
      for (const populate of options.populates) {
        user.populate(populate)
      }
    }
    if (options?.lean) {
      user.lean()
    }
    if (options?.select) {
      user.select(options.select)
    }

    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto, options): Promise<User> {
    const user = await this.userModel.findOne({ _id: id })
    if (!user) {
      throw new NotFoundException('Пользователь не найден!')
    }

    user.set({
      ...updateUserDto,
      updated: {
        by: options?.user
      }
    })

    return user.save()
  }

  async updateAvatar(id: string, avatarId: string, options) {
    const user = await this.userModel.findOne({ _id: id })
    if (!user) {
      throw new NotFoundException('Пользователь не найден!')
    }

    user.set({
      avatarId,
      updated: {
        by: options?.user
      }
    })

    user.save()
  }

  async cleanHistory(id: string, options) {
    const user = await this.userModel.findOne({ _id: id })
    if (!user) {
      throw new NotFoundException('Пользователь не найден!')
    }

    user.set({
      videoHistory: [],
      updated: {
        by: options?.user
      }
    })

    user.save()
  }

  async remove(id: string, options) {
    const user = await this.userModel.findOne({ _id: id })
    if (!user) {
      throw new NotFoundException('Пользователь не найден!')
    }

    user.set({
      deleted: {
        by: options?.user
      }
    })

    user.save()
  }
}
