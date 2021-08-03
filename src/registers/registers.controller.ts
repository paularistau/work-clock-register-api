import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { Register } from './register.entity';
import { RegistersService } from './registers.service';

@Controller('registers')
@UseGuards(AuthGuard())
export class RegistersController {
  constructor(private registerService: RegistersService) {}

  @Get()
  getRegisters(@GetUser() user: User): Promise<Register[]> {
    return this.registerService.getRegisters(user);
  }

  @Post()
  createRegister(
    @Body() createRegisterDto: CreateRegisterDto,
    @GetUser() user: User,
  ): Promise<Register> {
    return this.registerService.createRegister(createRegisterDto, user);
  }

  @Patch('/:id/entries')
  updateEntries(
    @Param('id') id: string,
    @Body() updateRegisterDto: UpdateRegisterDto,
    @GetUser() user: User,
  ): Promise<Register> {
    if (updateRegisterDto.entryType === 'lunchIn') {
      return this.registerService.updateLunchIn(
        id,
        updateRegisterDto.entry,
        user,
      );
    }
    if (updateRegisterDto.entryType === 'lunchOut') {
      return this.registerService.updateLunchOut(
        id,
        updateRegisterDto.entry,
        user,
      );
    }
    if (updateRegisterDto.entryType === 'timeOut') {
      return this.registerService.updateTimeOut(
        id,
        updateRegisterDto.entry,
        user,
      );
    }
  }
}
