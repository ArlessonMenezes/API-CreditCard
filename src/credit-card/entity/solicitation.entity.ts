import { User } from "src/user/entity/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SolicitationStatusEnum } from "../enum/solicitation-status.enum";

@Entity()
export class Solicitation {
  @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column()
    status: SolicitationStatusEnum;

    @Column()
    preferredDueDay: number;

    @JoinColumn()
    @OneToOne(() => User)
    user: User;
}