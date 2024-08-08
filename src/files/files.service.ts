import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { path } from 'app-root-path'
import { extname } from 'path'
import { ensureDir, writeFile } from 'fs-extra'
import { File, FileDocument } from './schemas/file.schema'
import { Model } from 'mongoose'

@Injectable()
export class FilesService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async createFile(file: Express.Multer.File, type: string, options?: { user: string }): Promise<File> {
    const createdFile = new this.fileModel({
      name: file.originalname,
      'created.by': options?.user
    })

    const extension = extname(createdFile.name)
    createdFile.path = `${type}/${createdFile._id}${extension}`
    createdFile.save()
    
    return createdFile
  }

  async writeFile(filePath: string, type: string, data: Buffer) {
    const uploadFolder = `${path}/uploads/${filePath}`
    await ensureDir(`${path}/uploads/${type}`)
    await writeFile(uploadFolder, data)
  }

  async findOne(conditions: { _id: string }): Promise<File> {
    const file = this.fileModel.findOne(conditions)
    if (!file) {
      throw new NotFoundException('Файл не найден!')
    }
    return file
  }
}
