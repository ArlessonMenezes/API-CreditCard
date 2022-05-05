import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { Solicitation } from './entity/solicitation.entity';
import { CreditCardRequestDTO } from './types/credit-card-request.dto';
import { UserService } from '../user/user.service';
import { CreditCard } from './entity/credit-card.entity';
import { addYears } from 'date-fns';
import { BrandsEnum } from './enum/brands.enum';
import generateCreditCard from './helpers/generate-credit-card.helper';
import { SolicitationStatusEnum } from './enum/solicitation-status.enum';
import { UserStatusEnum } from 'src/user/enum/user-status.enum';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(Solicitation)
    private readonly solicitationRepository: Repository<Solicitation>,
    @InjectRepository(CreditCard)
    private readonly creditCardRepository: Repository<CreditCard>,
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

    const approved = this.isApproved();

    const user = await this.userService.createUser({
      name: creditCardRequestDTO.name,
      password: creditCardRequestDTO.password,
      email: creditCardRequestDTO.email,
      cpf: creditCardRequestDTO.cpf,
      status: approved ? UserStatusEnum.ENABLE : UserStatusEnum.DESABLE, 
    })
      
    const createSolicitation = this.solicitationRepository.create({
      preferredDueDay: creditCardRequestDTO.preferredDueDay,
      user: user,
      status: approved? SolicitationStatusEnum.APPROVED : SolicitationStatusEnum.DENIED
    })

    await this.solicitationRepository.save(createSolicitation)

    if (approved) {
      this.generateCreditCardForApprovedSolicitation(user)
    }

    return approved;
  }

  private async generateCreditCardForApprovedSolicitation(user: User) {
    const DEFAULT_BRAND = BrandsEnum.VISA

    return await this.creditCardRepository.save(
      this.creditCardRepository.create({
        valid_util: addYears(new Date(), 5),
        number: generateCreditCard(DEFAULT_BRAND),
        cvv: '000',
        brand: DEFAULT_BRAND,
        user,
      })
    )
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
