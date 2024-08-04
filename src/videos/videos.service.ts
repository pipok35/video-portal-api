import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Video, VideoDocument } from './shemas/video.schema'
import { CreateVideoDto } from './dto/createVideo.dto'

@Injectable()
export class VideosService {
  constructor(@InjectModel(Video.name) private videoModel: Model<VideoDocument>) {}

  async create(CreateVideoDto: CreateVideoDto, options: { user: string }): Promise<Video> {
    const createdVideo = new this.videoModel({
      ...CreateVideoDto,
      'created.by': options?.user
    })
    
    return createdVideo.save()
  }

  async findAll(conditions: { 'created.by': string }): Promise<Video[]> {
    return this.videoModel.find(conditions)
  }

  async findOne(conditions: { _id: string, 'created.by': string }): Promise<Video> {
    return this.videoModel.findOne(conditions)
  }
}
