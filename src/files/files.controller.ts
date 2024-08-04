import { Controller, Request, Get, Post, Query, StreamableFile, UploadedFile, UseInterceptors, Param } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FilesService } from './files.service'
import { Public } from 'src/decorators/public.decorator'
import { File } from './schemas/file.schema'
import { path } from 'app-root-path'

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }
    
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Query('type') type: string, @Request() req): Promise<File> {
    const createdFile = await this.filesService.createFile(file, type, { user: req.user })
    await this.filesService.writeFile(createdFile.path, type, file.buffer)

    return createdFile
  }

  @Public()
  @Get(':fileId/download')
  async getFile(@Param('fileId') fileId: string): Promise<StreamableFile> {
    const file = await this.filesService.findOne({ _id: fileId })
    const filePath = `${path}/uploads/${file.path}`
    const stream = await this.filesService.getFileReadStream(filePath)

    return new StreamableFile(stream)
  }
}
