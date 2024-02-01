import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class AddBookDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  price: number;
}
