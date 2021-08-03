import { IsNotEmpty } from 'class-validator';

export class UpdateRegisterDto {
  @IsNotEmpty()
  entry: Date;

  @IsNotEmpty()
  entryType: string;
}
