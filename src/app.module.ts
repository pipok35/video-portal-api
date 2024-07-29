import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { VideosModule } from './videos/videos.module'
import { ChannelsModule } from './channels/channels.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/youtube-app'),
    AuthModule,
    UsersModule,
    VideosModule,
    ChannelsModule,
  ],
})
export class AppModule {}
