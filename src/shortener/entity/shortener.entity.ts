import { Users } from 'src/users/entity/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Shortener {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    shortCode: string;

    @Column()
    original: string;

    @Column({ default: 0 }) 
    clicks: number;

    @CreateDateColumn()
    createdAt:Date

    @ManyToOne(() => Users, user => user.shorteners)
    user: Users;
}