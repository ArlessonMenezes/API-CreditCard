import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreditCard } from 'src/credit-card/entity/credit-card.entity';
import { BalanceService } from './balance.service';
import { GetBalanceDto } from './types/get-balance.dto';

@ApiTags('Balance')
@ApiBearerAuth('JWT')
@Controller('balance')
export class BalanceController {
  constructor(
    private readonly balanceService: BalanceService,
  ) {}

  @Get(':creditCard')
  async getBalance(@Param('creditCard') creditCard: string ) {
    const balance = await this.balanceService.getBalanceCreditCard(creditCard);
    return new GetBalanceDto(balance)
  }
}
