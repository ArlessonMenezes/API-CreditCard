import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './types/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
  ){}

  async createUser(user: CreateUserDto) {
    const userCreate = this.userRepository.create(user)
    return await this.userRepository.save(userCreate); 
  }

  async verifyUserExist(email: string, cpf: string) {
    const foundUserByEmail = await this.findAllUsersByEmail(email)
    const foundUserByCpf = await this.findAllUsersByCpf(cpf)

    return foundUserByEmail.length > 0 || foundUserByCpf.length > 0;
  }

  async findAllUsersByEmail(email: string) {
    return await this.userRepository.find({ email })
  }

  async findOneUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ email })
    return user;
  }

  async findAllUsersByCpf(cpf: string) {
    return await this.userRepository.find({ cpf })
  }
}
