import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Channel, ChannelDocument } from './schemas/channel.schema'
import { CreateChannelDto } from './dto/create-channel.dto'

@Injectable()
export class ChannelsService {
  constructor(@InjectModel(Channel.name) private channelModel: Model<ChannelDocument>) {}

  async create(createChannelDto: CreateChannelDto, options: { user: string }): Promise<Channel> {

    try { 
      const createdChannel = new this.channelModel({
        ...createChannelDto,
        'created.by': options?.user,
        'created.at': Date.now()
      })

      createdChannel.save()

      return createdChannel
    } catch (error) {
      throw new InternalServerErrorException('Произошла ошибка при создании канала', error.message)
    }
  }

  async findAll(conditions: { 'created.by': string }): Promise<Channel[]> {
    return this.channelModel.find(conditions)
  }

  async findOne(conditions: { _id: string, 'created.by': string }): Promise<Channel> {
    const channel = this.channelModel.findOne(conditions)

    return channel
  }

  async subscribe(channelId: string, userId: string): Promise<Channel> {
    return this.channelModel.findByIdAndUpdate(channelId, { $addToSet: { subscribers: userId } }, { new: true }).exec()
  }

  async unsubscribe(channelId: string, userId: string): Promise<Channel> {
    return this.channelModel.findByIdAndUpdate(channelId, { $pull: { subscribers: userId } }, { new: true }).exec()
  }
}
