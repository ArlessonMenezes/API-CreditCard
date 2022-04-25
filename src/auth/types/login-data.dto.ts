import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDataDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "E-mail do usuário"
})
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "Senha do usuário"
})
  password: string;
}