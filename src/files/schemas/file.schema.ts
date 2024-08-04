import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ByAt } from 'src/interfaces/byAt'
import { v4 as uuidv4 } from 'uuid'

export type FileDocument = File & Document;

@Schema({ versionKey: false, timestamps: false })
export class File {
  @Prop({ required: true, default: uuidv4 })
    _id: string
  
  @Prop({ required: true })
    name: string

  @Prop({ required: true })
    path: string
  
  @Prop(raw({
    by: String,
    at: Date
  }))
    created?: Record<string, ByAt>

  @Prop(raw({
    by: String,
    at: Date
  }))
    updated?: Record<string, ByAt>

  @Prop(raw({
    by: String,
    at: Date
  }))
    deleted?: Record<string, ByAt>
}

export const FileSchema = SchemaFactory.createForClass(File)
