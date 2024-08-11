import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ByAt } from '../../interfaces/byAt'
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
}

export const FileSchema = SchemaFactory.createForClass(File)
