import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatementFilterDto } from './types/statement-filter.dto';
import { Transaction } from 'src/transaction/entity/transaction.entity';
import { Repository } from 'typeorm';
import { PaginatedResultDto } from 'src/types/paginated-result.dto';

@Injectable()
export class StatementService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transacrionRepository: Repository<Transaction>,
  ) {}

  async paginate(statementFilterDto: StatementFilterDto) {
    const { page, limit, from, to } = statementFilterDto
    const qb = this.transacrionRepository.createQueryBuilder('transaction')

    const skip = page * limit
    const [ result, total ] = await qb
      .where("transaction.date between :from AND :to", { from, to })
      .skip(skip)
      .take(limit)
      .getManyAndCount()

    return new PaginatedResultDto<Transaction>(
      result,
      page, 
      total, 
      result.length,
      )
  }
}
