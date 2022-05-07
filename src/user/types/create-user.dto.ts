import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumberString } from "class-validator";
import { UserStatusEnum } from "../enum/user-status.enum";

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;

  @IsNumberString()
  cpf: string;

  @ApiProperty({ description: 'Status do usuário' })
  status: UserStatusEnum;
}