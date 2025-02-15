import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tarefas' })
export class Tarefa {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @IsString({ message: 'O titulo deve ser uma string' })
  @MaxLength(50, { message: 'O título não pode ter mais de 50 caracteres' })
  titulo!: string;

  @Column()
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @IsString({ message: 'A descrição deve ser uma string' })
  @MaxLength(100, { message: 'A descrição deve ter no máximo 100 caracteres' })
  descricao!: string;

  @Column({ default: 'pendente' })
  @IsEnum(['pendente', 'em progresso', 'concluida'], {
    message: 'Status inválido',
  })
  status!: 'pendente' | 'em progresso' | 'concluida';

  @CreateDateColumn()
  data_de_criacao!: Date;
}
