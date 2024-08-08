import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { VideosService } from './videos.service'
import { VideosController } from './videos.controller'
import { Video, VideoSchema } from './shemas/video.schema'
import { UsersModule } from 'api-src/users/users.module'

@Module({
  imports: [ MongooseModule.forFeature([ { name: Video.name, schema: VideoSchema } ]), UsersModule ],
  providers: [ VideosService ],
  controllers: [ VideosController ]
})
export class VideosModule {}
