import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @Expose()
  @IsEmail({}, { message: 'O email deve ser válido' })
  @IsNotEmpty()
  @MaxLength(100, { message: 'O email deve ter no máximo 100 caracteres' })
  email!: string;

  @Expose()
  @IsNotEmpty()
  @MinLength(4, { message: 'A senha deve ter pelo menos 4 caracteres' })
  @MaxLength(12, { message: 'A senha deve ter no máximo 12 caracteres' })
  password!: string;
}
