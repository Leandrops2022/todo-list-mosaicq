import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { Task } from '../models/Task';
import { TaskService } from '../services/TaskService';

const taskRouter = Router({ mergeParams: true });

const taskService = new TaskService();

const taskController = new TaskController(taskService);

taskRouter.post('/', validateRequestBody(Task), taskController.createTask);

taskRouter.get('/', taskController.listAllUserTasks);

taskRouter.get('/:tid', taskController.getTaskById);

taskRouter.put('/:tid', validateRequestBody(Task), taskController.updateTask);

taskRouter.patch('/:tid', taskController.markTaskAsDone);

taskRouter.delete('/:tid', taskController.deleteTask);

export default taskRouter;
