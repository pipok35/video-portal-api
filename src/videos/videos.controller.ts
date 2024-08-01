import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { VideosService } from './videos.service'
import { Video } from './shemas/video.schema'

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createVideoDto: Video, @Request() req) {
    createVideoDto.ownerId = req.user.userId
    return this.videosService.create(createVideoDto)
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
