import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDataDto } from './types/login-data.dto';
import { IsPublic }  from './types/is-public.decorator';

@IsPublic()
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
