import { IsNotEmpty, IsString } from 'class-validator'

export class VideoDto {
  @IsString()
  @IsNotEmpty()
    title: string

  @IsString()
    description: string

  @IsString()
  @IsNotEmpty()
    url: string
}