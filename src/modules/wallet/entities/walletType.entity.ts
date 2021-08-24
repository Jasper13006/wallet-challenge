import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne } from "typeorm";
import { Movement } from "./movement.entity";
import { Wallet } from "./wallet.entity";

@Entity({ name: 'WalletType' })
export class WalletType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, })
    name!: string;

    @Column({ type: 'datetime' })
    @CreateDateColumn()
    public createdAt: Date | null;

    @Column({ type: 'datetime', nullable: true })
    @UpdateDateColumn()
    public updatedAt: Date | null;

    @Column({ type: 'datetime', nullable: true })
    @DeleteDateColumn()
    public deletedAt: Date | null;

    @OneToOne(() => Movement, (movement) => movement.walletTypeId)
    movement: Movement;

    @OneToOne(() => Wallet, (wallet) => wallet.walletTypeId)
    wallet: Wallet;
}
