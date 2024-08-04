import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { path } from 'app-root-path'
import { extname } from 'path'
import { ensureDir, writeFile } from 'fs-extra'
import { FileResponse } from 'src/interfaces/file-response'
import { File, FileDocument } from './schemas/file.schema'
import { Model } from 'mongoose'

@Injectable()
export class FilesService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async createFile(file: Express.Multer.File, type: string, options: { user: string }): Promise<FileResponse> {
    const createdFile = new this.fileModel({
      name: file.originalname,
      'created.by': options?.user
    })

    const extension = extname(createdFile.name)
    createdFile.path = `${type}/${createdFile._id}${extension}`
    createdFile.save()

    const uploadFolder = await this.saveFile(createdFile.path, type, file.buffer)
    
    return { url: uploadFolder, name: createdFile.name }
  }

  async saveFile(filePath: string, type:string, data: Buffer): Promise<string> {
    const uploadFolder = `${path}/uploads/${filePath}`
    await ensureDir(`${path}/uploads/${type}`)
    await writeFile(uploadFolder, data)

    return uploadFolder
  }
}
