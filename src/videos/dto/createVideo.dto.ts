import { IsNotEmpty, IsString } from 'class-validator'

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
    title: string

  @IsString()
    description: string
  
  @IsString()
    url: string
  
  @IsString()
    filename: string
}