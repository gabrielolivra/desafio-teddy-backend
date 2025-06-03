import { Shortener } from 'src/shortener/entity/shortener.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({
    name: 'email',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @OneToMany(() => Shortener, shortener => shortener.user)
 shorteners: Shortener[];
}

