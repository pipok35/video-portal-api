import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import configuration from './config/config'
import { ConfigModule, ConfigService  } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { VideosModule } from './videos/videos.module'
import { ChannelsModule } from './channels/channels.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [ configuration ] }),
    MongooseModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.url')
      }),
      inject: [ ConfigService ]
    }),
    AuthModule,
    UsersModule,
    VideosModule,
    ChannelsModule
  ]
})
  
export class AppModule {}
