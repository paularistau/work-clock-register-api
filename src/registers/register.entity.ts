import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Register {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: true })
  date?: Date;

  @Column({ nullable: true })
  timeIn?: Date;

  @Column({ nullable: true })
  lunchIn?: Date;

  @Column({ nullable: true })
  lunchOut?: Date;

  @Column({ nullable: true })
  timeOut?: Date;

  @ManyToOne((_type) => User, (user) => user.registers, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
