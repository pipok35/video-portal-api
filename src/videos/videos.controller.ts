import { Controller, Get, Post, Body, Param, Request, UploadedFile, UseInterceptors } from '@nestjs/common'
import { VideosService } from './videos.service'
import { CreateVideoDto } from './dto/createVideo.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { extname } from 'path'

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`
        callback(null, uniqueSuffix)
      }
    })
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() createVideoDto: CreateVideoDto, @Request() req) {
    const video = await this.videosService.create(file, createVideoDto, { user: req.user })
    return { video, id: video._id }
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
