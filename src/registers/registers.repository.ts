import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateRegisterDto } from './dto/create-register.dto';
import { Register } from './register.entity';

@EntityRepository(Register)
export class RegistersRepository extends Repository<Register> {
  async getRegisters(user: User): Promise<Register[]> {
    const query = this.createQueryBuilder('register');
    query.where({ user });
    const registers = await query.getMany();

    return registers;
  }

  async createRegister(
    createRegisterDto: CreateRegisterDto,
    user: User,
  ): Promise<Register> {
    const { date, timeIn } = createRegisterDto;
    const register = this.create({
      date,
      timeIn,
      user,
    });

    await this.save(register);
    return register;
  }
}
