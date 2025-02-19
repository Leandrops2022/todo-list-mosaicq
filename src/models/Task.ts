import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
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

  @Column()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @IsString({ message: 'O titulo deve ser uma string' })
  @MaxLength(50, { message: 'O título não pode ter mais de 50 caracteres' })
  title!: string;

  @Column()
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @IsString({ message: 'A descrição deve ser uma string' })
  @MaxLength(100, { message: 'A descrição deve ter no máximo 100 caracteres' })
  description!: string;

  @Column({ default: 'pendente' })
  @IsEnum(TaskStatus, {
    message: 'Status inválido',
  })
  status!: TaskStatus;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
