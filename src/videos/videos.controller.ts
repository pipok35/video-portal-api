import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common'
import { VideosService } from './videos.service'
import { CreateVideoDto } from './dto/createVideo.dto'

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post('create')
  async create(@Body() createVideoDto: CreateVideoDto, @Request() req) {
    const video = await this.videosService.create(createVideoDto, { user: req.user })
    return video._id
  }
  
  @Get()
  async findAll(@Request() req) {
    return this.videosService.findAll({ createdBy: req.user })
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return this.videosService.findOne({ _id: id, createdBy: req.user })
  }
}
