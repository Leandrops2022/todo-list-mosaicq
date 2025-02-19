import { DeleteResult, UpdateResult } from 'typeorm';
import { TaskRepository } from '../repositories/TaskRepository';
import { Task } from '../models/Task';
import { TaskStatus } from '../enums/TaskStatusEnum';
import { ResponseData } from '../interfaces/ResponseData';
import { NotFoundError } from '../errors/NotFoundError';

export class TaskService {
  private repository = TaskRepository;

  public async createTask(task: Task, userId: number): Promise<ResponseData> {
    const result = await this.repository
      .createQueryBuilder()
      .insert()
      .into(Task)
      .values({
        ...task,
        user: { id: userId },
      })
      .execute();

    return {
      message: 'Sucess',
      data: result,
    };
  }

  public async listAllUserTasks(userId: number): Promise<ResponseData> {
    const result = await this.repository.find({
      where: { user: { id: userId } },
    });

    return {
      message: 'Success',
      data: result,
    };
  }

  public async getTaskById(taskId: number, userId: number) {
    const result = await this.repository.findOne({
      where: { id: taskId, user: { id: userId } },
    });

    if (result === null) {
      throw new NotFoundError('Tarefa não encontrada');
    }

    return {
      message: 'Tarefa encontrada',
      data: result,
    };
  }

  public async updateTask(
    id: number,
    updateData: Partial<Task>
  ): Promise<ResponseData> {
    const task = await this.repository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundError('Tarefa não encontrada');
    }

    updateData.id = id;

    const result = await this.repository.save(updateData);

    return {
      message: 'Tarefa atualizada com sucesso',
      data: result,
    };
  }

  public async markTaskAsDone(id: number): Promise<ResponseData> {
    const result: UpdateResult = await this.repository.update(id, {
      status: TaskStatus.DONE,
    });

    if (result.affected === 0) {
      throw new NotFoundError('Tarefa não encontrada');
    }

    return {
      message: 'Tarefa concluída com sucesso',
      data: true,
    };
  }

  public async deleteTask(id: number): Promise<ResponseData> {
    const result: DeleteResult = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundError('Tarefa não encontrada');
    }

    return {
      message: 'Tarefa deletada com sucesso',
      data: true,
    };
  }
}
