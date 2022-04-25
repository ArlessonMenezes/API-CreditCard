import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    PassportModule, 
    JwtModule.register({
      secret: 'abc',
      signOptions: { expiresIn: '3200s' }
    })],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {}
