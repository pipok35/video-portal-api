import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'

@Injectable()
export class FilesService {

  async saveFile(file: Express.Multer.File, options: { type: string }): Promise<{ name: string, url: string}> {
    const uploadFolder = `${path}/uploads/${options?.type}`
    await ensureDir(uploadFolder)
    await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)
      
    return { url: `${uploadFolder}/${file.originalname}`, name: file.originalname }
  }
}
