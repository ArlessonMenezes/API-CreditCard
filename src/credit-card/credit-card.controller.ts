import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreditCardRequestDTO } from './types/credit-card-request.dto';
import { Solicitation } from './entity/solicitation.entity';
import { CreditCardService } from './credit-card.service';
import { userInfo } from 'os';

@ApiTags('Solicitção')
@Controller('credit-card')
export class CreditCardController {
  constructor(
      private readonly creditCardService: CreditCardService,
    ) {}

    @Post('request')
    async request(
        @Body() creditCardRequestDTO: CreditCardRequestDTO) {
          const approved = await this.creditCardService.createSolicitation(creditCardRequestDTO)
          return { approved }
    }
}
