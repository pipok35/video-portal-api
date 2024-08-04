import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as passport from 'passport'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: true,
    credentials: true
  }) // Включение CORS
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }))
  app.setGlobalPrefix('api')
  app.use(passport.initialize()) // Инициализация Passport
  app.use(cookieParser())

  await app.listen(3000)
}

bootstrap()
