import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDataDto } from './types/login-data.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ){}

  async login(loginDataDto: LoginDataDto) {
     const { email } = loginDataDto;
     const user = await this.userService.findOneUserByEmail(email)

    const payload = { sub: user.id, email: user.email }
      
    return {
      token: this.jwtService.sign(payload)
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneUserByEmail(email)  
    
    if (!user) {
      throw new UnauthorizedException()
    }

    const passwordIsValid = await bcrypt.compare(password, user.password)
    if (!passwordIsValid) return null
    
    return user
  }
}
