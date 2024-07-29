import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common'
// import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ChannelsService } from './channels.service'
import { Channel } from './schemas/channel.schema'

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createChannelDto: Channel, @Request() req) {
    createChannelDto.ownerId = req.user.userId
    return this.channelsService.create(createChannelDto)
  }

  @Get()
  async findAll() {
    return this.channelsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.channelsService.findOne(id)
  }

  // @UseGuards(JwtAuthGuard)
  @Post(':id/subscribe')
  async subscribe(@Param('id') channelId: string, @Request() req) {
    return this.channelsService.subscribe(channelId, req.user.userId)
  }

  // @UseGuards(JwtAuthGuard)
  @Post(':id/unsubscribe')
  async unsubscribe(@Param('id') channelId: string, @Request() req) {
    return this.channelsService.unsubscribe(channelId, req.user.userId)
  }
}
