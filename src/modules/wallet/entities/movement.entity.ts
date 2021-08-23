import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToOne } from "typeorm";
import { MovementType } from "./movementType.entity";
import { Wallet } from "./wallet.entity";
import { WalletType } from "./walletType.entity";

@Entity({ name: 'Movement' })
export class Movement {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    userId!: number;

    @Column({ type: 'decimal', precision: 9, scale: 8, default: 0, })
    amount!: number;

    @Column()
    walletTypeId!: number;

    @Column()
    movementTypeId!: number;

    @Column()
    walletId!: number

    @Column({ type: 'datetime' })
    @CreateDateColumn()
    public createdAt: Date | null;

    @Column({ type: 'datetime', nullable: true })
    @UpdateDateColumn()
    public updatedAt: Date | null;

    @Column({ type: 'datetime', nullable: true })
    @DeleteDateColumn()
    public deletedAt: Date | null;

    @ManyToOne(() => Wallet, (wallet) => wallet.id)
    wallet: Wallet;

    @OneToOne(() => WalletType, (walletType) => walletType.id)
    walletType: WalletType;

    @OneToOne(() => MovementType, (movementType) => movementType.id)
    movementType: MovementType;
}
