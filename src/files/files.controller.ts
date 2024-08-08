import { Controller, Request, Get, Post, Query, UploadedFile, UseInterceptors, Param, NotFoundException, Res } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FilesService } from './files.service'
import { Public } from 'src/decorators/public.decorator'
import { File } from './schemas/file.schema'
import { path } from 'app-root-path'
import { existsSync } from 'fs-extra'
import { createReadStream } from 'fs'

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
  async getFile(@Param('fileId') fileId: string, @Res() res) {
    const file = await this.filesService.findOne({ _id: fileId })
    if (!file) {
      throw new NotFoundException('Файл не найден!')
    }
    
    const filePath = `${path}/uploads/${file.path}`

    if (!existsSync(filePath)) {
      throw new NotFoundException('Файл не найден в хранилище!')
    }
    
    const stream = createReadStream(filePath)

    stream.pipe(res)
  }
}
