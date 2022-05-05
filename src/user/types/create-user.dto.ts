import { UserStatusEnum } from "../enum/user-status.enum";

export class CreateUserDto {
  name: string;
  password: string;
  email: string;
  cpf: string;
  status: UserStatusEnum;
}