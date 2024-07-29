import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key', // Измените на ваш секретный ключ
      signOptions: { expiresIn: '60m' },
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
