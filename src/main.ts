import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors() // Включение CORS
  app.use(passport.initialize()) // Инициализация Passport
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}
bootstrap()
