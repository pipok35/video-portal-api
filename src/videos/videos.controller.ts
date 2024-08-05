import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common'
import { VideosService } from './videos.service'
import { CreateVideoDto } from './dto/create-video.dto'
import { Video } from './shemas/video.schema'

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post('create')
  async create(@Body() createVideoDto: CreateVideoDto, @Request() req): Promise<string> {
    const video = await this.videosService.create(createVideoDto, { user: req.user })
    return video._id
  }
  
  @Get()
  async findAll(@Request() req): Promise<Video[]> {
    return this.videosService.findAll({ 'created.by': req.user })
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req): Promise<Video> {
    return this.videosService.findOne({ _id: id, 'created.by': req.user })
  }
}
