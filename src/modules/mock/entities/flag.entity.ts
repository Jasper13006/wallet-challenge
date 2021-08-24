import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';


@Entity({ name: 'Flag' })
export class Flag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    nameMock!: string;

    @Column({ type: 'datetime' })
    @CreateDateColumn()
    public createdAt: Date | null;

    @Column({ type: 'datetime', nullable: true })
    @UpdateDateColumn()
    public updatedAt: Date | null;

    @Column({ type: 'datetime', nullable: true })
    @DeleteDateColumn()
    public deletedAt: Date | null;

}
