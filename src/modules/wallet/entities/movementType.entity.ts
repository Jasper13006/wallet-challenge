import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne } from "typeorm";
import { Movement } from "./movement.entity";

@Entity({ name: 'MovementType' })
export class MovementType {
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

    @OneToOne(() => Movement, (movement) => movement.movementTypeId)
    movement: Movement;
}
