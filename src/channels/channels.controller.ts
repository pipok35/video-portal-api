import { Controller, Get, Post, Body, Request, Param } from '@nestjs/common'
import { ChannelsService } from './channels.service'
import { CreateChannelDto } from './dto/create-channel.dto'
import { Channel } from './schemas/channel.schema'

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Post()
  async create(@Body() createChannelDto: CreateChannelDto, @Request() req): Promise<Channel> {
    return this.channelsService.create(createChannelDto, { user: req.user })
  }

  @Get()
  async findAll(@Request() req): Promise<Channel[]> {
    return this.channelsService.findAll({ 'created.by': req.user })
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req): Promise<Channel> {
    return await this.channelsService.findOne({ _id: id, 'created.by': req.user })
  }

  @Post(':id/subscribe')
  async subscribe(@Param('id') channelId: string, @Request() req) {
    return this.channelsService.subscribe(channelId, req.user.userId)
  }

  @Post(':id/unsubscribe')
  async unsubscribe(@Param('id') channelId: string, @Request() req) {
    return this.channelsService.unsubscribe(channelId, req.user.userId)
  }
}
