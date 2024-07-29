import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ChannelDocument = Channel & Document;

@Schema()
export class Channel {
  @Prop({ required: true })
  name: string

  @Prop()
  description: string

  @Prop({ required: true })
  ownerId: string

  @Prop({ type: [String], default: [] })
  subscribers: string[]
}

export const ChannelSchema = SchemaFactory.createForClass(Channel)
