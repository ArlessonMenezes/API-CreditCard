import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './types/create-transaction.dto';
import { TransactionService } from './transaction.service';
import { IsPublic } from 'src/auth/types/is-public.decorator';

@IsPublic()
@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionServie: TransactionService){}

  @Post()
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return await this.transactionServie.createTransction(createTransactionDto)  
  }
}
