import { Wallet } from "src/modules/wallet/entities/wallet.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";

@Entity({ name: 'User' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name!: string;

    @Column({ type: 'varchar', })
    lastName!: string;

    @Column({ unique: true, type: 'varchar' })
    alias!: string;

    @Column({ unique: true, type: 'varchar' })
    email!: string;

    @Column({ type: 'datetime' })
    @CreateDateColumn()
    public createdAt: Date | null;

    @Column({ type: 'datetime', nullable: true })
    @UpdateDateColumn()
    public updatedAt: Date | null;

    @Column({ type: 'datetime', nullable: true })
    @DeleteDateColumn()
    public deletedAt: Date | null;

    @OneToMany(() => Wallet, (wallet) => wallet.userId)
    wallets: Wallet[];
}