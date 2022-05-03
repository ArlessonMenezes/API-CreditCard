import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth('JWT')
@Controller('user')
export class UserController {

  @UseGuards(JwtAuthGuard)
  @Get()
  async getHello() {
    return 'Olá, Passei do AuthGuard!'
  }
}
