import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Video, VideoDocument } from './shemas/video.schema'
import { CreateVideoDto } from './dto/createVideo.dto'

@Injectable()
export class VideosService {
  constructor(@InjectModel(Video.name) private videoModel: Model<VideoDocument>) {}

  async create(file: Express.Multer.File, CreateVideoDto: CreateVideoDto, options): Promise<Video> {
    const createdVideo = new this.videoModel({
      filename: file.filename,
      path: file.path,
      title: CreateVideoDto.title,
      description: CreateVideoDto.description,
      createdBy: options?.user
    })
    return createdVideo.save()
  }

  async findAll(): Promise<Video[]> {
    return this.videoModel.find().exec()
  }

  async findOne(id: string): Promise<Video> {
    return this.videoModel.findById(id).exec()
  }
}
