import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MoviesService } from './movies.service'
import { MoviesController } from './movies.controller'
import { Movie, MovieSchema } from './movie.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
