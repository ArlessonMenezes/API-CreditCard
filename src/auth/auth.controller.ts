import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDataDto } from './types/login-data.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ){}

  @Post('login')
  async login(@Body() loginDataDto: LoginDataDto) {
    return await this.authService.login(loginDataDto)
  }
}
