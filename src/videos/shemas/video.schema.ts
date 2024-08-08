import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { File } from '../../files/schemas/file.schema'
import { ByAt } from 'src/interfaces/byAt'


export type VideoDocument = Video & Document;

@Schema({ versionKey: false, timestamps: false })
export class Video {
  @Prop({ required: true, default: uuidv4 })
    _id: string
  
  @Prop({ required: true })
    title: string

  @Prop()
    description: string

  @Prop({ type: String, ref: 'File', required: true })
    videoFile: File
  
  @Prop({ type: String, ref: 'File' })
    previewFile: File
  
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

export const VideoSchema = SchemaFactory.createForClass(Video)
