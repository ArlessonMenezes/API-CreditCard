import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { hashSync } from 'bcrypt';
import { UserStatusEnum } from "../enum/user-status.enum";
import { CreditCard } from "src/credit-card/entity/credit-card.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ unique: true })
    cpf: string;

    @Column()
    status: UserStatusEnum;

    @BeforeInsert()
    hashPassword(){
      this.password = hashSync(this.password, 10) 
    }
}