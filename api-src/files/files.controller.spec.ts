import { FilesController } from './files.controller'
import { FilesService } from './files.service'
import { Express } from 'express'

describe('FilesController', () => {
  let filesController: FilesController
  let filesService: FilesService

  beforeEach(() => {
    filesService = {
      createFile: jest.fn(),
      writeFile: jest.fn()
    } as any

    filesController = new FilesController(filesService)
  })

  it('should return success message when file is uploaded successfully', async () => {
    const mockFile: Express.Multer.File = {
      fieldname: 'file',
      originalname: 'test.txt',
      encoding: '7bit',
      mimetype: 'text/plain',
      size: 1024,
      buffer: Buffer.from('test content'),
      stream: null as any,
      destination: '',
      filename: '',
      path: ''
    }

    const mockRequest = { user: 'testUser' }

    const mockCreatedFile = {
      _id: '123',
      path: 'type/123.txt',
      name: 'test.txt',
      created: new Date(),
      updated: new Date()
    }

    jest.spyOn(filesService, 'createFile').mockResolvedValue(mockCreatedFile as any)
    jest.spyOn(filesService, 'writeFile').mockResolvedValue(undefined)

    const result = await filesController.uploadFile(mockFile, 'type', mockRequest)

    expect(result).toEqual({
      status: 'success',
      message: 'Файл успешно загружен',
      createdFile: mockCreatedFile
    })
    expect(filesService.createFile).toHaveBeenCalledWith(mockFile, 'type', { user: 'testUser' })
    expect(filesService.writeFile).toHaveBeenCalledWith('type/123.txt', 'type', mockFile.buffer)
  })
})
