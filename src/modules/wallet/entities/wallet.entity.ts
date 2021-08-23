import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { Movement } from "./movement.entity";
import { WalletType } from "./walletType.entity";

@Entity({ name: 'Wallet' })
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId!: number;

    @Column({ type: 'decimal', precision: 9, scale: 8, default: 0, })
    balance!: number;

    @Column()
    walletTypeId!: number;

    @Column({ type: 'datetime' })
    @CreateDateColumn()
    public createdAt: Date | null;

    @Column({ type: 'datetime', nullable: true })
    @UpdateDateColumn()
    public updatedAt: Date | null;

    @Column({ type: 'datetime', nullable: true })
    @DeleteDateColumn()
    public deletedAt: Date | null;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @OneToOne(() => WalletType, (walletType) => walletType.id)
    walletType: WalletType;

    @OneToMany(() => Movement, (movement) => movement.id)
    movement: Movement[];
}
