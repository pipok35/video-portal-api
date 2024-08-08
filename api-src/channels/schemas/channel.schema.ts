import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { User } from '../../users/schemas/user.schema'
import { ByAt } from 'api-src/interfaces/byAt'

export type ChannelDocument = Channel & Document;

@Schema({ versionKey: false, timestamps: false })
export class Channel {
  @Prop({ required: true, default: uuidv4 })
    _id: string
  
  @Prop({ required: true })
    title: string

  @Prop()
    description: string

  @Prop({ type: [ { type: String, ref: 'User' } ], default: [] })
    subscribers: User[]
  
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

export const ChannelSchema = SchemaFactory.createForClass(Channel)
