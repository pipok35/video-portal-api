import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UpdateUserDto {
  @IsNotEmpty()
  @IsEmail()
    email: string

  @IsNotEmpty()
  @IsString()
    username: string
}