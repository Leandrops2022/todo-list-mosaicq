import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from '../enums/TaskStatusEnum';
import { User } from './User';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @IsString({ message: 'O titulo deve ser uma string' })
  @MaxLength(150, { message: 'O título não pode ter mais de 50 caracteres' })
  title!: string;

  @Column({ type: 'text' })
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  @MaxLength(400, { message: 'A descrição deve ter no máximo 400 caracteres' })
  description?: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  @IsEnum(TaskStatus, {
    message: 'Status inválido',
  })
  status!: TaskStatus;

  @CreateDateColumn({ type: 'date' })
  created_at!: Date;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
