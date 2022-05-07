import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Transaction } from 'src/transaction/entity/transaction.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { BrandsEnum } from '../enum/brands.enum';

@Entity()
export class CreditCard {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'float', default: 50 })
  @ApiProperty({ description: 'Limite do cartão de crédito' })
  limit: number;

  @Column({ type: 'float' , default: 50 })
  @ApiProperty({ description: 'Valor disponivel no cartão de crédito' })
  disponible: number;

  @Column()
  @ApiProperty({ description: 'Número do cartão de crédito' })
  number: string;

  @Column({ default: BrandsEnum.VISA })
  @IsEnum(BrandsEnum)
  @ApiProperty({ description: 'Bandeira do cartão de crédito', enum: BrandsEnum })
  brand: BrandsEnum;

  @Column({ type: 'timestamp' })
  @ApiProperty({ description: 'Validade do cartão de crédito' })
  valid_util: Date;

  @Column({ length: 3 })
  @ApiProperty({ description: 'Códiog de segurança do cartão de crédito' })
  cvv: string;

  @JoinColumn()
  @OneToOne(() => User)
  user: User;

  @JoinColumn()
  @OneToMany(() => Transaction, (transaction) => transaction.credit_card)
  transaction: Transaction[];
}