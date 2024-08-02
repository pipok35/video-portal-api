/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { CreateUserDto } from './dto/createUser.dto'
import * as bcrypt from 'bcryptjs'

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

  async findOne(email: string): Promise<any> {
    return this.userModel.findOne({ email })
  }
}
