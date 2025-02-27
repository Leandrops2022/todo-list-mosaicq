import { DeleteResult, UpdateResult } from 'typeorm';
import { TaskRepository } from '../repositories/TaskRepository';
import { TaskStatus } from '../enums/TaskStatusEnum';
import { ResponseData } from '../interfaces/ResponseData';
import { NotFoundError } from '../errors/NotFoundError';
import { UpdateTaskDto } from '../dtos/UpdateTaskDto';
import { CreateTaskDto } from '../dtos/CreateTaskDto';
import { BadRequestError } from '../errors/BadRequestError';
import UnauthorizedError from '../errors/UnauthorizedError';
import { plainToInstance } from 'class-transformer';
import { TaskPresentationDto } from '../dtos/TaskPresentationDto';

export class TaskService {
  private repository = TaskRepository;

  public async createTask(dto: CreateTaskDto, uid: number) {
    const newTask = this.repository.create({
      ...dto,
      user: { id: uid },
    });

    const savedTask = await this.repository.save(newTask);

    const recentTask = await this.repository.findOne({
      where: { id: savedTask.id },
    });

    const dtoTask = plainToInstance(TaskPresentationDto, recentTask, {
      excludeExtraneousValues: true,
    });

    return {
      message: 'Tarefa criada com sucesso',
      data: dtoTask,
    };
  }

  public async listAllUserTasks(userId: number): Promise<ResponseData> {
    const result = await this.repository.find({
      select: {
        id: true,
        title: true,
        status: true,
        description: true,
        created_at: true,
      },
      where: { user: { id: userId } },
    });
    if (result.length > 0) {
      const dtoArray = result.map((task) =>
        plainToInstance(TaskPresentationDto, task, {
          excludeExtraneousValues: true,
        })
      );

      return {
        message: 'Tarefas carregadas com sucesso',
        data: dtoArray,
      };
    }
    return {
      message: 'Tarefas carregadas com sucesso',
      data: [],
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
      data: plainToInstance(TaskPresentationDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  public async updateTask(
    dto: UpdateTaskDto,
    tid: number,
    loggedUserId: number
  ): Promise<ResponseData> {
    if (dto.id !== tid) {
      throw new BadRequestError();
    }

    const task = await this.repository.findOne({
      where: { id: dto.id },
      relations: ['user'],
    });

    if (!task) {
      throw new NotFoundError('Tarefa não encontrada');
    }

    if (task.user.id != loggedUserId) {
      throw new UnauthorizedError();
    }

    const updatedTask = Object.assign(task, dto);

    const result = await this.repository.save(updatedTask);
    const presentationDto = plainToInstance(TaskPresentationDto, result, {
      excludeExtraneousValues: true,
    });

    return {
      message: 'Tarefa atualizada com sucesso',
      data: presentationDto,
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
