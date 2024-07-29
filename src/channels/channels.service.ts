import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Channel, ChannelDocument } from './schemas/channel.schema'

@Injectable()
export class ChannelsService {
  constructor(@InjectModel(Channel.name) private channelModel: Model<ChannelDocument>) {}

  async create(channel: Channel): Promise<Channel> {
    const createdChannel = new this.channelModel(channel)
    return createdChannel.save()
  }

  async findAll(): Promise<Channel[]> {
    return this.channelModel.find().exec()
  }

  async findOne(id: string): Promise<Channel> {
    return this.channelModel.findById(id).exec()
  }

  async subscribe(channelId: string, userId: string): Promise<Channel> {
    return this.channelModel.findByIdAndUpdate(channelId, { $addToSet: { subscribers: userId } }, { new: true }).exec()
  }

  async unsubscribe(channelId: string, userId: string): Promise<Channel> {
    return this.channelModel.findByIdAndUpdate(channelId, { $pull: { subscribers: userId } }, { new: true }).exec()
  }
}
