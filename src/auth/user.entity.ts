import { Register } from 'src/registers/register.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  amount?: number;

  @OneToMany((_type) => Register, (task) => task.user, { eager: true })
  registers: Register[];
}
