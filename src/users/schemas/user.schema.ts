import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop({ required: true, default: uuidv4 })
    _id: string
  
  @Prop({ required: true })
    username: string

  @Prop({ required: true })
    email: string

  @Prop({ required: true })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
