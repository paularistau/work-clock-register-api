import { IsNotEmpty } from 'class-validator';

export class CreateRegisterDto {
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  timeIn: Date;
}
