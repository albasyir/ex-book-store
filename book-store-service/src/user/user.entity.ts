import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { USER_ROLE } from './user.contants';

@Entity()
@Unique(['identifier'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  identifier: string;

  @Column()
  password: string;

  @Column({ enum: USER_ROLE })
  role: USER_ROLE;
}
