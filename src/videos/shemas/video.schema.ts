import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ByAt } from 'src/interfaces/byAt'
import { v4 as uuidv4 } from 'uuid'

export type VideoDocument = Video & Document;

@Schema({ versionKey: false, timestamps: false })
export class Video {
  @Prop({ required: true, default: uuidv4 })
    _id: string
  
  @Prop({ required: true })
    title: string

  @Prop()
    description: string

  @Prop({ required: true })
    filename: string

  @Prop({ required: true })
    url: string
  
  @Prop(raw({
    by: String,
    at: Date
  }))
    created?: Record<string, ByAt>

  @Prop(raw({
    by: String,
    at: Date
  }))
    deleted?: Record<string, ByAt>
}

export const VideoSchema = SchemaFactory.createForClass(Video)
