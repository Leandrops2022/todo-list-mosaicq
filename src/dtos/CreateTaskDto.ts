import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TaskStatus } from '../enums/TaskStatusEnum';
import { Expose } from 'class-transformer';

export class CreateTaskDto {
  @Expose()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @IsString({ message: 'O titulo deve ser uma string' })
  @MaxLength(150, { message: 'O título não pode ter mais de 150 caracteres' })
  title!: string;

  @Expose()
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  @MaxLength(400, { message: 'A descrição deve ter no máximo 400 caracteres' })
  description?: string;

  @Expose()
  @IsEnum(TaskStatus, {
    message: 'Status inválido',
  })
  status!: TaskStatus;
}
