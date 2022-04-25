import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { Solicitation } from './entity/solicitation.entity';
import { SolicitationStatus } from './enum/solicitation-status.enum';
import { CreditCardRequestDTO } from './types/credit-card-request.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(Solicitation)
    private readonly solicitationRepository: Repository<Solicitation>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
  ){}

  async createSolicitation(creditCardRequestDTO: CreditCardRequestDTO) {
    const userExist = await this.userService.verifyUserExist(
      creditCardRequestDTO.email, 
      creditCardRequestDTO.cpf
    )

    if (userExist) {
      throw new BadRequestException('Usuário já existe na base de dados')
    }

    const user = await this.userService.createUser({
      name: creditCardRequestDTO.name,
      password: creditCardRequestDTO.password,
      email: creditCardRequestDTO.email,
      cpf: creditCardRequestDTO.cpf,
     })
      
    const approved = this.isApproved();

    const createSolicitation = this.solicitationRepository.create({
      preferredDueDay: creditCardRequestDTO.preferredDueDay,
      user: user,
      status: approved? SolicitationStatus.APPROVED : SolicitationStatus.DENIED
    })

    await this.solicitationRepository.save(createSolicitation)

    return approved;
  }

  private isApproved() {
    const score = this.requestScore();
    return score >= 600;
  }

  private requestScore() {
    return this.randomIntFromInterval(0, 1000);
  }

  private randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
