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
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() createVideoDto: CreateVideoDto, @Request() req) {
    return this.videosService.create(file, createVideoDto, { user: req.user.userId })
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
