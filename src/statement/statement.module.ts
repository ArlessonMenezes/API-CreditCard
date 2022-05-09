import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatementController } from './statement.controller';
import { StatementService } from './statement.service';
import { Transaction } from '../transaction/entity/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Transaction ])
  ],
  controllers: [StatementController],
  providers: [StatementService]
})
export class StatementModule {}
