import { Users } from 'src/users/entity/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Shortener {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'short_code', unique: true, nullable: true })
  shortCode: string;

  @Column({ name: 'original', nullable: true })
  original: string;

  @Column({ name: 'clicks', default: 0 })
  clicks: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Users, (user) => user.shorteners)
  user: Users;
}
