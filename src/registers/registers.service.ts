import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateRegisterDto } from './dto/create-register.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { RegistersRepository } from './registers.repository';
import { Register } from './register.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class RegistersService {
  constructor(
    @InjectRepository(RegistersRepository)
    private registersRepository: RegistersRepository,
  ) {}

  async getRegisters(user: User) {
    return this.registersRepository.getRegisters(user);
  }

  createRegister(
    createRegisterDto: CreateRegisterDto,
    user: User,
  ): Promise<Register> {
    return this.registersRepository.createRegister(createRegisterDto, user);
  }

  async getRegisterById(id: string, user: User): Promise<Register> {
    const found = await this.registersRepository.findOne({
      where: { id, user },
    });

    if (!found) {
      throw new NotFoundException(`Register with ID "${id}" not found`);
    }

    return found;
  }
  async updateLunchIn(
    id: string,
    lunchIn: Date,
    user: User,
  ): Promise<Register> {
    const register = await this.getRegisterById(id, user);

    register.lunchIn = lunchIn;
    await this.registersRepository.save(register);
    return register;
  }

  async updateLunchOut(
    id: string,
    lunchOut: Date,
    user: User,
  ): Promise<Register> {
    const register = await this.getRegisterById(id, user);

    register.lunchOut = lunchOut;
    await this.registersRepository.save(register);
    return register;
  }

  async updateTimeOut(
    id: string,
    timeOut: Date,
    user: User,
  ): Promise<Register> {
    const register = await this.getRegisterById(id, user);

    register.timeOut = timeOut;
    await this.registersRepository.save(register);
    return register;
  }
}
