import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { VideosService } from './videos.service'
import { VideosController } from './videos.controller'
import { Video, VideoSchema } from './shemas/video.schema'

@Module({
  imports: [ MongooseModule.forFeature([ { name: Video.name, schema: VideoSchema } ]) ],
  providers: [ VideosService ],
  controllers: [ VideosController ]
})
export class VideosModule {}
