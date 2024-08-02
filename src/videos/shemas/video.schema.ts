import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export type VideoDocument = Video & Document;

@Schema()
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
    path: string
  
  @Prop()
    createdBy: string
  
  @Prop({ default: Date.now })
    createdAt: Date
  
  @Prop()
    updatedBy: string
  
  @Prop({ default: Date.now })
    updatedAt: Date
  
  @Prop()
    deletedBy: string
  
  @Prop({ default: Date.now })
    deletedAt: Date
}

export const VideoSchema = SchemaFactory.createForClass(Video)
