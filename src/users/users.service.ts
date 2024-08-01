/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './schemas/user.schema'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user)

    return createdUser.save()
  }

  async register(user: any) {
    const hashedPassword = bcrypt.hashSync(user.password, 10)
    const newUser = await this.create({
      ...user,
      password: hashedPassword
    })

    return newUser
  }

  async findOne(email: string): Promise<any> {
    return this.userModel.findOne({ email })
  }
}
