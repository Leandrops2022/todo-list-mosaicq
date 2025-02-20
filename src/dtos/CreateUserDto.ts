import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  @MaxLength(150, { message: 'O nome deve ter no máximo 150 caracteres' })
  name!: string;

  @IsEmail({}, { message: 'O email deve ser válido' })
  @IsNotEmpty({ message: 'Voce deve preencher o campo email' })
  @MaxLength(100, { message: 'O email deve ter no máximo 100 caracteres' })
  email!: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @MinLength(4, { message: 'A senha deve ter pelo menos 4 caracteres' })
  @MaxLength(12, { message: 'A senha deve ter no máximo 12 caracteres' })
  password!: string;
}
