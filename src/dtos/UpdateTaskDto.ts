import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TaskStatus } from '../enums/TaskStatusEnum';
import { Type } from 'class-transformer';

export class UpdateTaskDto {
  @IsNumber({}, { message: 'A id deve ser um numero válido' })
  @IsNotEmpty({ message: 'Você deve informar a id da task' })
  @Type(() => Number)
  id!: number;

  @IsOptional()
  @IsString({ message: 'O titulo deve ser uma string' })
  @MaxLength(150, { message: 'O título não pode ter mais de 150 caracteres' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  @MaxLength(400, { message: 'A descrição deve ter no máximo 400 caracteres' })
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Status inválido',
  })
  status?: TaskStatus;
}
