import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { LoginDataDto } from './types/login-data.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ){}
  
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginDataDto: LoginDataDto) {
    return await this.authService.login(loginDataDto)
  }
}
