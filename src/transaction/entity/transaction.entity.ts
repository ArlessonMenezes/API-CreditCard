import { IsEnum } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { TransactionStatusEnum } from '../enum/transaction-status.enum';
import { CreditCard } from '../../credit-card/entity/credit-card.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'float' })
  value: number;

  @Column({ default: TransactionStatusEnum.PENDING })
  @IsEnum(TransactionStatusEnum)
  status: TransactionStatusEnum;

  @JoinColumn()
  @ManyToOne(() => CreditCard)
  credit_card: CreditCard;

}