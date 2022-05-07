import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@ApiBearerAuth('JWT')
@ApiTags('Users')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get('ola-teste')
  async getHello() {
    return 'Olá, Passei do AuthGuard!'
  }

  @Get('profile-user')
  async getAllUsers(@Query('email') email: string) {
    return await this.userService.findOneUserByEmail(email)
  }
}
