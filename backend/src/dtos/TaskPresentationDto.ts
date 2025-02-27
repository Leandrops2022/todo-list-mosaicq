import { Expose, Transform } from 'class-transformer';
import { TaskStatus } from '../enums/TaskStatusEnum';

export class TaskPresentationDto {
  @Expose()
  id!: number;

  @Expose({ name: 'title' })
  titulo!: string;

  @Expose({ name: 'description' })
  descricao?: string;

  @Expose()
  status!: TaskStatus;

  @Expose({ name: 'created_at' })
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleDateString('en-GB') : null
  )
  criado_em?: Date;
}
