import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type VideoDocument = Video & Document;

@Schema()
export class Video {
  @Prop({ required: true })
    title: string

  @Prop()
    description: string

  @Prop({ required: true })
    url: string

  @Prop({ required: true })
    ownerId: string
}

export const VideoSchema = SchemaFactory.createForClass(Video)
