import { Controller, Get, Post, Query, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FilesService } from './files.service'
import { createReadStream } from 'fs'
import { Public } from 'src/decorators/public.decorator'

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }
    
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Query('type') type: string): Promise<{ name: string, url: string }> {
    return this.filesService.saveFile(file, { type })
  }

  @Public()
  @Get('download')
  getFile(@Query('url') url: string): StreamableFile {
    const file = createReadStream(url)
    return new StreamableFile(file)
  }
}
