import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { Task } from '../models/Task';
import { asyncHandler } from '../middleware/asyncHandler';
import { TaskService } from '../services/TaskService';

export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  createTask = asyncHandler(async (req: Request, res: Response) => {
    const task = plainToInstance(Task, req.body);
    const { user_id } = req.body;
    res.status(201).json(await this.taskService.createTask(task, user_id));
  });

  listAllUserTasks = asyncHandler(async (req: Request, res: Response) => {
    const { uid } = req.params;
    res
      .status(200)
      .json(await this.taskService.listAllUserTasks(parseInt(uid)));
  });

  public updateTask = asyncHandler(async (req: Request, res: Response) => {
    const { tid } = req.params;
    const taskToUpdate = plainToInstance(Task, req.body);
    const result = await this.taskService.updateTask(
      parseInt(tid),
      taskToUpdate
    );

    res.status(200).json(result);
  });

  public markTaskAsDone = asyncHandler(async (req: Request, res: Response) => {
    const { tid } = req.params;

    res.status(200).json(await this.taskService.markTaskAsDone(parseInt(tid)));
  });

  public deleteTask = asyncHandler(async (req: Request, res: Response) => {
    const { tid } = req.params;

    res.status(200).json(await this.taskService.deleteTask(parseInt(tid)));
  });

  public getTaskById = asyncHandler(async (req: Request, res: Response) => {
    const { uid, tid } = req.params;
    res
      .status(200)
      .json(
        await this.taskService.getTaskById(parseFloat(tid), parseFloat(uid))
      );
  });
}
