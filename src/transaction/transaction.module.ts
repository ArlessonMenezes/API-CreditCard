import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entity/transaction.entity';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { CreditCard } from '../credit-card/entity/credit-card.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Transaction, CreditCard ])
  ],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
