import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Video } from 'src/videos/shemas/video.schema'
import { v4 as uuidv4 } from 'uuid'

export type UserDocument = User & Document
type VideoHistoryType = string | Video
@Schema()
export class User {
  @Prop({ required: true, default: uuidv4 })
    _id: string
  
  @Prop({ required: true })
    username: string

  @Prop({ required: true })
    email: string

  @Prop({ required: true, select: false })
    password: string
  
  @Prop({ type: [ String ] , ref: 'Video', default: [] })
    videoHistory: VideoHistoryType[]
}

export const UserSchema = SchemaFactory.createForClass(User)
