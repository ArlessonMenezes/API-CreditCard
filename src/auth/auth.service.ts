import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDataDto } from './types/login-data.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ){}

  async login(loginDataDto: LoginDataDto) {
    const { email, password } = loginDataDto;
    const user = await this.userService.findOneUserByEmail(email)

    if (!user) {
      throw new UnauthorizedException()    
    } 
    
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw new UnauthorizedException()
    }

    const payload = { email, sub: user.id }
      
    return{
      token: this.jwtService.sign(payload)
    }
  }
}
