import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Channel, ChannelDocument } from './schemas/channel.schema'
import { CreateChannelDto } from './dto/createChannel.dto'

@Injectable()
export class ChannelsService {
  constructor(@InjectModel(Channel.name) private channelModel: Model<ChannelDocument>) {}

  async create(channel: CreateChannelDto, options: { user: string }): Promise<Channel> {
    const createdChannel = new this.channelModel({
      ...channel,
      createdBy: options?.user
    })

    return createdChannel.save()
  }

  async findAll(conditions: { createdBy: string }): Promise<Channel[]> {
    return this.channelModel.find(conditions)
  }

  async findOne(conditions: { _id: string, createdBy: string }): Promise<Channel> {
    return this.channelModel.findOne(conditions)
  }

  async subscribe(channelId: string, userId: string): Promise<Channel> {
    return this.channelModel.findByIdAndUpdate(channelId, { $addToSet: { subscribers: userId } }, { new: true }).exec()
  }

  async unsubscribe(channelId: string, userId: string): Promise<Channel> {
    return this.channelModel.findByIdAndUpdate(channelId, { $pull: { subscribers: userId } }, { new: true }).exec()
  }
}
