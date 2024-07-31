import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ChannelsService } from './channels.service'
import { ChannelsController } from './channels.controller'
import { Channel, ChannelSchema } from './schemas/channel.schema'

@Module({
  imports: [ MongooseModule.forFeature([ { name: Channel.name, schema: ChannelSchema } ]) ],
  providers: [ ChannelsService ],
  controllers: [ ChannelsController ]
})
export class ChannelsModule {}
