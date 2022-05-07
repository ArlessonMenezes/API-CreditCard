import { ApiProperty } from "@nestjs/swagger";

export class CreateTransactionDto {

  @ApiProperty({ description: 'Cartão de crédito utilizado na compra' })
  credit_card: string;

  @ApiProperty({ description: 'Valor da compra' })
  value: number;
}