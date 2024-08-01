import { Controller, Get, Post, Body, Request, Param } from '@nestjs/common'
import { VideosService } from './videos.service'
import { VideoDto } from './dto/video.dto'

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  async create(@Body() createVideoDto: VideoDto, @Request() req) {
    return this.videosService.create(createVideoDto, { user: req.user.userId })
  }
  
  @Get()
  async findAll() {
    return this.videosService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.videosService.findOne(id)
  }
}
