import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsNumber({}, { message: 'A id deve ser um numero válido' })
  @IsNotEmpty({ message: 'Você deve informar a id do usuario' })
  @Type(() => Number)
  id!: number;

  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  @MaxLength(150, { message: 'O nome deve ter no máximo 150 caracteres' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'O email deve ser válido' })
  @MaxLength(100, { message: 'O email deve ter no máximo 100 caracteres' })
  email?: string;

  @IsOptional()
  @MinLength(4, { message: 'A senha deve ter pelo menos 4 caracteres' })
  @MaxLength(12, { message: 'A senha deve ter no máximo 12 caracteres' })
  password?: string;
}
