import { IsNotEmpty, IsString } from 'class-validator'

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
    title: string

  @IsString()
    description: string
  
  @IsNotEmpty()
  @IsString()
    videoFile: string
  
  @IsString()
    previewFile: string
}