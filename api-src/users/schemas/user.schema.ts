import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ByAt } from 'api-src/interfaces/byAt'
import { Video } from 'api-src/videos/shemas/video.schema'
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
  
  @Prop({ type: [ { type: String, ref: 'Video' } ] , default: [] })
    videoHistory: VideoHistoryType[]
  
  @Prop()
    avatarId: string
  
  @Prop({
    type: {
      by: { type: String, ref: 'User' },
      at: { type: Date, default: Date.now }
    }
  })
    created: ByAt

  @Prop({
    type: {
      by: { type: String, ref: 'User' },
      at: { type: Date, default: Date.now }
    }
  })
    updated: ByAt

  @Prop({
    type: {
      by: { type: String, ref: 'User' },
      at: { type: Date }
    }
  })
    deleted: ByAt
}

export const UserSchema = SchemaFactory.createForClass(User)
