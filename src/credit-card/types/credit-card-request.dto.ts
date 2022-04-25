import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class CreditCardRequestDTO {

    @ApiProperty({
        description: "Dia do pagamento da fatura"
    })
    @IsNumber()
    preferredDueDay: number;

    @ApiProperty({
        description: "Nome do usuário"
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: "E-mail do usuário, usado para o login"
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "Senha utilizada para o login"
    })
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: "CPF do usuário"
    })
    @IsNotEmpty()
    @IsNumberString()
    cpf: string;
}