import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RegistersController } from './registers.controller';
import { RegistersRepository } from './registers.repository';
import { RegistersService } from './registers.service';

@Module({
  imports: [TypeOrmModule.forFeature([RegistersRepository]), AuthModule],
  controllers: [RegistersController],
  providers: [RegistersService],
})
export class RegisterModule {}
