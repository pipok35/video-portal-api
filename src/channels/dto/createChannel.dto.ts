import { IsNotEmpty, IsString } from 'class-validator'

export class CreateChannelDto {
  @IsString()
  @IsNotEmpty()
    title: string

  @IsString()
    description: string
}