import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Video, VideoDocument } from './shemas/video.schema'

@Injectable()
export class VideosService {
  constructor(@InjectModel(Video.name) private videoModel: Model<VideoDocument>) {}

  async create(video: Video): Promise<Video> {
    const createdVideo = new this.videoModel(video)
    return createdVideo.save()
  }

  async findAll(): Promise<Video[]> {
    return this.videoModel.find().exec()
  }

  async findOne(id: string): Promise<Video> {
    return this.videoModel.findById(id).exec()
  }
}
