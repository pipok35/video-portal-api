import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ByAt } from 'src/interfaces/byAt'
import { v4 as uuidv4 } from 'uuid'
import { User } from '../../users/schemas/user.schema'

export type ChannelDocument = Channel & Document;

@Schema({ versionKey: false, timestamps: false })
export class Channel {
  @Prop({ required: true, default: uuidv4 })
    _id: string
  
  @Prop({ required: true })
    title: string

  @Prop()
    description: string

  @Prop({ type: [ String ], ref: 'User', default: [] })
    subscribers: User[]
  
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

export const ChannelSchema = SchemaFactory.createForClass(Channel)
