import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TaskStatus } from '../enums/TaskStatusEnum';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @IsString({ message: 'O titulo deve ser uma string' })
  @MaxLength(150, { message: 'O título não pode ter mais de 150 caracteres' })
  title!: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  @MaxLength(400, { message: 'A descrição deve ter no máximo 400 caracteres' })
  description?: string;

  @IsEnum(TaskStatus, {
    message: 'Status inválido',
  })
  status!: TaskStatus;
}
