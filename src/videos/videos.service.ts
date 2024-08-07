import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Video, VideoDocument } from './shemas/video.schema'
import { CreateVideoDto } from './dto/create-video.dto'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class VideosService {
  constructor(@InjectModel(Video.name) private videoModel: Model<VideoDocument>, private readonly usersService: UsersService) {}

  async create(CreateVideoDto: CreateVideoDto, options?: { user: string }): Promise<Video> {
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
    const video = this.videoModel.findOne(conditions)
    if (!video) {
      if (!video) {
        throw new NotFoundException('Видео не найдено!')
      }
    }
    return video
  }

  async addToHistory(videoId: string, userId: string) {
    const user = await this.usersService.findOne({ _id: userId })
    if (!user) {
      throw new NotFoundException('Пользователь не найден!')
    }
    if (user.videoHistory.includes(videoId)) {
      return
    }
    
    user.videoHistory = [ ...user.videoHistory, videoId ]

    user.save()
  }
}
