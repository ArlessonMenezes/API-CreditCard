import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCardController } from './credit-card.controller';
import { User } from '../user/entity/user.entity';
import { Solicitation } from './entity/solicitation.entity';
import { CreditCardService } from './credit-card.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User, Solicitation])
  ],
  exports: [TypeOrmModule],
  controllers: [CreditCardController],
  providers: [CreditCardService, UserService]
})
export class CreditCardModule {}
