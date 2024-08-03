import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { FileResponse } from 'src/interfaces/file-response'

@Injectable()
export class FilesService {

  async saveFile(file: Express.Multer.File, options: { type: string }): Promise<FileResponse> {
    const uploadFolder = `${path}/uploads/${options?.type}`
    await ensureDir(uploadFolder)
    await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)
      
    return { url: `${uploadFolder}/${file.originalname}`, name: file.originalname }
  }
}
