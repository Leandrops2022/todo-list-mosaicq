import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TaskService } from '../../src/services/TaskService';
import { TaskRepository } from '../../src/repositories/TaskRepository';
import { Task } from '../../src/models/Task';
import { TaskStatus } from '../../src/enums/TaskStatusEnum';
import { NotFoundError } from '../../src/errors/NotFoundError';
import { DeleteResult, UpdateResult } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UpdateTaskDto } from '../../src/dtos/UpdateTaskDto';
import { TaskPresentationDto } from '../../src/dtos/TaskPresentationDto';

vi.mock('../../src/repositories/TaskRepository');

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    service = new TaskService();
    vi.restoreAllMocks();
  });

  const mockUserId = 1;
  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    status: TaskStatus.PENDING,
    user: { id: mockUserId },
  };

  const taskPresentationDto = plainToInstance(TaskPresentationDto, mockTask);
  describe('createTask', () => {
    it('should create and return a new task', async () => {
      TaskRepository.create = vi.fn().mockReturnValue(mockTask);
      TaskRepository.save = vi.fn().mockResolvedValue(mockTask);

      const response = await service.createTask(mockTask, mockUserId);

      expect(TaskRepository.create).toHaveBeenCalledWith({
        ...mockTask,
        user: { id: mockUserId },
      });
      expect(TaskRepository.save).toHaveBeenCalledWith(mockTask);
      expect(response).toEqual({
        message: 'Tarefa criada com sucesso',
        data: mockTask,
      });
    });
  });

  describe('listAllUserTasks', () => {
    it('should return all tasks for a given user ID', async () => {
      TaskRepository.find = vi.fn().mockResolvedValue([mockTask]);

      const response = await service.listAllUserTasks(mockUserId);

      expect(TaskRepository.find).toHaveBeenCalledWith({
        select: {
          created_at: true,
          id: true,
          status: true,
          title: true,
        },
        where: { user: { id: mockUserId } },
      });
      expect(response).toEqual({
        message: 'Tarefas carregadas com sucesso',
        data: [taskPresentationDto],
      });
    });

    it('should return an empty array if no tasks are found', async () => {
      TaskRepository.find = vi.fn().mockResolvedValue([]);

      const response = await service.listAllUserTasks(mockUserId);

      expect(response).toEqual({
        message: 'Tarefas carregadas com sucesso',
        data: [],
      });
    });
  });

  describe('getTaskById', () => {
    it('should return a task if it exists', async () => {
      TaskRepository.findOne = vi.fn().mockResolvedValue(mockTask);

      const response = await service.getTaskById(mockTask.id, mockUserId);

      expect(TaskRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockTask.id, user: { id: mockUserId } },
      });
      expect(response).toEqual({
        message: 'Tarefa encontrada',
        data: taskPresentationDto,
      });
    });

    it('should throw NotFoundError if the task does not exist', async () => {
      TaskRepository.findOne = vi.fn().mockResolvedValue(null);

      await expect(
        service.getTaskById(mockTask.id, mockUserId)
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('updateTask', () => {
    it('should update and return the task', async () => {
      TaskRepository.findOne = vi.fn().mockResolvedValue(mockTask);
      TaskRepository.save = vi.fn().mockResolvedValue({
        message: 'Tarefa atualizada com sucesso',
        data: mockTask,
      });

      const updateDto = plainToInstance(UpdateTaskDto, {
        id: mockTask.id,
        title: 'Updated Task',
      });

      const response = await service.updateTask(
        updateDto,
        mockTask.id,
        mockUserId
      );

      expect(TaskRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockTask.id },
        relations: ['user'],
      });
      expect(TaskRepository.save).toHaveBeenCalledWith(updateDto);
      expect(response).toEqual({
        message: 'Tarefa atualizada com sucesso',
        data: {
          message: 'Tarefa atualizada com sucesso',
          data: mockTask,
        },
      });
    });
  });

  describe('markTaskAsDone', () => {
    it('should mark a task as done', async () => {
      TaskRepository.update = vi
        .fn()
        .mockResolvedValue({ affected: 1 } as UpdateResult);

      const response = await service.markTaskAsDone(mockTask.id);

      expect(TaskRepository.update).toHaveBeenCalledWith(mockTask.id, {
        status: TaskStatus.DONE,
      });
      expect(response).toEqual({
        message: 'Tarefa concluída com sucesso',
        data: true,
      });
    });

    it('should throw NotFoundError if the task does not exist', async () => {
      TaskRepository.update = vi
        .fn()
        .mockResolvedValue({ affected: 0 } as UpdateResult);

      await expect(service.markTaskAsDone(mockTask.id)).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete a task successfully', async () => {
      TaskRepository.delete = vi
        .fn()
        .mockResolvedValue({ affected: 1 } as DeleteResult);

      const response = await service.deleteTask(mockTask.id);

      expect(TaskRepository.delete).toHaveBeenCalledWith(mockTask.id);
      expect(response).toEqual({
        message: 'Tarefa deletada com sucesso',
        data: true,
      });
    });

    it('should throw NotFoundError if the task does not exist', async () => {
      TaskRepository.delete = vi
        .fn()
        .mockResolvedValue({ affected: 0 } as DeleteResult);

      await expect(service.deleteTask(mockTask.id)).rejects.toThrow(
        NotFoundError
      );
    });
  });
});
