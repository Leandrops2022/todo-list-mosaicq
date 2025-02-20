import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { Task } from '../models/Task';
import { TaskService } from '../services/TaskService';
import { UpdateTaskDto } from '../dtos/UpdateTaskDto';

const taskRouter = Router({ mergeParams: true });

const taskService = new TaskService();

const taskController = new TaskController(taskService);

taskRouter.get('/', taskController.listAllUserTasks);

taskRouter.get('/:tid', taskController.getTaskById);

taskRouter.post('/', validateRequestBody(Task), taskController.createTask);

taskRouter.patch(
  '/:tid',
  validateRequestBody(UpdateTaskDto),
  taskController.updateTask
);

taskRouter.patch('/:tid/completa', taskController.markTaskAsDone);

taskRouter.delete('/:tid', taskController.deleteTask);

export default taskRouter;
