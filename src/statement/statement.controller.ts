import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StatementFilterDto } from './types/statement-filter.dto';
import { StatementService } from './statement.service';

@ApiTags('Statement')
@ApiBearerAuth('JWT')
@Controller('statement')
export class StatementController {
  constructor(
    private readonly statementService: StatementService,
  ) {}

  @Get()
  async getPaginateStatement(@Query() statementFilterDto: StatementFilterDto) {
    return await this.statementService.paginate(statementFilterDto)
  }
}
