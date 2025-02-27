import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import express, { Express } from 'express';
import request from 'supertest';
import { TaskController } from '../../src/controllers/TaskController';
import { TaskService } from '../../src/services/TaskService';
import { ResponseData } from '../../src/interfaces/ResponseData';
import { Task } from '../../src/models/Task';
import { TaskStatus } from '../../src/enums/TaskStatusEnum';
import { User } from '../../src/models/User';
import { errorHandler } from '../../src/middleware/errorHandler';

describe('TaskController Integration Tests', () => {
  let app: Express;
  let taskService: TaskService;
  let taskController: TaskController;

  const mockUser: User = {
    id: 1,
    name: 'Test user',
    email: 'test@email.com',
    password: 'testpassword',
    tasks: [],
  };

  const newDate = new Date().toISOString();

  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    status: TaskStatus.PENDING,
    user: mockUser,
    created_at: newDate,
  } as unknown as Task;

  const mockedResponse: { message: string; data: Task } = {
    message: 'Test message',
    data: mockTask,
  };

  beforeEach(() => {
    app = express();
    app.use(express.json());

    app.use((req, _res, next) => {
      req.user = { id: mockUser.id };
      next();
    });

    taskService = {
      createTask: vi.fn(),
      listAllUserTasks: vi.fn(),
      updateTask: vi.fn(),
      markTaskAsDone: vi.fn(),
      deleteTask: vi.fn(),
      getTaskById: vi.fn(),
    } as unknown as TaskService;

    taskController = new TaskController(taskService);

    app.get('/api/usuarios/:uid/tarefas', taskController.listAllUserTasks);
    app.get('/api/usuarios/:uid/tarefas/:tid', taskController.getTaskById);
    app.post('/api/usuarios/:uid/tarefas', taskController.createTask);
    app.patch('/api/usuarios/:uid/tarefas/:tid', taskController.updateTask);
    app.patch(
      '/api/usuarios/:uid/tarefas/:tid/completa',
      taskController.markTaskAsDone
    );
    app.delete('/api/usuarios/:uid/tarefas/:tid', taskController.deleteTask);

    app.use(errorHandler);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/usuarios/:uid/tarefas', () => {
    it('should list all tasks for a user', async () => {
      const mockedResponseList: ResponseData = {
        message: 'Test message',
        data: [mockTask],
      };

      vi.mocked(taskService.listAllUserTasks).mockResolvedValue(
        mockedResponseList
      );

      const response = await request(app).get(
        `/api/usuarios/${mockUser.id}/tarefas`
      );

      expect(response.status).toBe(200);
      expect(taskService.listAllUserTasks).toHaveBeenCalledWith(mockUser.id);
      expect(response.body).toEqual(mockedResponseList);
    });
  });

  describe('GET /api/usuarios/:uid/tarefas/:tid', () => {
    it('should get a task by id', async () => {
      vi.mocked(taskService.getTaskById).mockResolvedValue(mockedResponse);

      const response = await request(app).get(
        `/api/usuarios/${mockUser.id}/tarefas/${mockTask.id}`
      );

      expect(response.status).toBe(200);
      expect(taskService.getTaskById).toHaveBeenCalledWith(
        mockTask.id,
        mockUser.id
      );
      expect(response.body).toEqual(mockedResponse);
    });
  });

  describe('POST /api/usuarios/:uid/tarefas', () => {
    it('should create a new task', async () => {
      const newTaskPayload = {
        dto: {
          ...mockTask,
          user_id: mockTask.user.id,
        },
      };
      vi.mocked(taskService.createTask).mockResolvedValue(mockedResponse);

      const response = await request(app)
        .post(`/api/usuarios/${mockUser.id}/tarefas`)
        .send(newTaskPayload);

      expect(response.status).toBe(201);
      expect(taskService.createTask).toHaveBeenCalledWith(
        newTaskPayload.dto,
        newTaskPayload.dto.user_id
      );
      expect(response.body).toEqual(mockedResponse);
    });
  });

  describe('PATCH /api/usuarios/:uid/tarefas/:tid', () => {
    it('should update a task', async () => {
      const updateData: Task = {
        title: 'Updated Task',
        description: 'Updated Description',
      } as Task;

      const updatePayload = { dto: updateData };

      const updatedMockedResponse: { message: string; data: Task } = {
        message: 'Test message',
        data: updateData as unknown as Task,
      };

      vi.mocked(taskService.updateTask).mockResolvedValue(
        updatedMockedResponse
      );

      const response = await request(app)
        .patch(`/api/usuarios/${mockUser.id}/tarefas/${mockTask.id}`)
        .send(updatePayload);

      expect(response.status).toBe(200);
      expect(taskService.updateTask).toHaveBeenCalledWith(
        updateData,
        mockTask.id,
        mockUser.id
      );
      expect(response.body).toEqual(updatedMockedResponse);
    });
  });

  describe('PATCH /api/usuarios/:uid/tarefas/:tid/completa', () => {
    it('should mark a task as done', async () => {
      const patchedTask = { ...mockTask, status: TaskStatus.DONE };

      const patchedMockedResponse: { message: string; data: Task } = {
        message: 'Test message',
        data: patchedTask,
      };

      vi.mocked(taskService.markTaskAsDone).mockResolvedValue(
        patchedMockedResponse
      );

      const response = await request(app).patch(
        `/api/usuarios/${mockUser.id}/tarefas/${mockTask.id}/completa`
      );

      expect(response.status).toBe(200);
      expect(taskService.markTaskAsDone).toHaveBeenCalledWith(mockTask.id);
      expect(response.body).toEqual(patchedMockedResponse);
    });
  });

  describe('DELETE /api/usuarios/:uid/tarefas/:tid', () => {
    it('should delete a task', async () => {
      vi.mocked(taskService.deleteTask).mockResolvedValue({
        message: 'Tarefa deletada com sucesso',
        data: true,
      });

      const response = await request(app).delete(
        `/api/usuarios/${mockUser.id}/tarefas/${mockTask.id}`
      );

      expect(response.status).toBe(200);
      expect(taskService.deleteTask).toHaveBeenCalledWith(mockTask.id);
      expect(response.body).toEqual({
        message: 'Tarefa deletada com sucesso',
        data: true,
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle service errors appropriately', async () => {
      const userId = 1;
      const error = new Error('Service Error');

      vi.mocked(taskService.listAllUserTasks).mockRejectedValue(error);

      const response = await request(app).get(
        `/api/usuarios/${userId}/tarefas`
      );

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
    });
  });
});
