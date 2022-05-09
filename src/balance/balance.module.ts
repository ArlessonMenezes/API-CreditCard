import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCard } from 'src/credit-card/entity/credit-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ CreditCard ])],
  providers: [BalanceService],
  controllers: [BalanceController]
})
export class BalanceModule {}
