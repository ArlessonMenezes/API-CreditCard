import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entity/transaction.entity';
import { CreateTransactionDto } from './types/create-transaction.dto';
import { CreditCard } from '../credit-card/entity/credit-card.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(CreditCard)
    private readonly creditCardRepository: Repository<CreditCard>,
    
  ) {}

  async createTransction(createTransactionDto: CreateTransactionDto) {
    //Buscar cartão OK
    //Verificar se tem limite no cartão OK
    //Debita o valor do limite OK

    const { credit_card, value } = createTransactionDto
    const creditcard = await this.creditCardRepository.findOne({ number: credit_card })

    if (!creditcard) {
      throw new BadRequestException('Cartão de crédito não existe')
    }

    const hasLimit = creditcard.disponible >= value

    if (!hasLimit) {
      throw new BadRequestException('Não há limite disponível')
    }

    const transactions = this.transactionRepository.create({
      date: new Date().toString(),
      value: createTransactionDto.value,
      credit_card: creditcard
    });

    await this.creditCardRepository.update(creditcard.id, {
      disponible: creditcard.disponible - transactions.value,
    })

    return await this.transactionRepository.save(transactions);
  }
}
