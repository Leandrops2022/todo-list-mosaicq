import { Response } from 'express';
import { CustomRequest } from '../interfaces/CustomRequest';
import { asyncHandler } from '../middleware/asyncHandler';
import { TaskService } from '../services/TaskService';

export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  public listAllUserTasks = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const { uid } = req.params;
      res
        .status(200)
        .json(await this.taskService.listAllUserTasks(parseInt(uid)));
    }
  );

  public getTaskById = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const { uid, tid } = req.params;
      res
        .status(200)
        .json(
          await this.taskService.getTaskById(parseFloat(tid), parseFloat(uid))
        );
    }
  );

  public createTask = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const { dto } = req.body;
      const uid = req.user?.id;
      res.status(201).json(await this.taskService.createTask(dto, uid!));
    }
  );

  public updateTask = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const { dto } = req.body;
      const { tid } = req.params;
      const loggedUserId = req.user?.id;
      const result = await this.taskService.updateTask(
        dto,
        parseInt(tid),
        loggedUserId!
      );

      res.status(200).json(result);
    }
  );

  public markTaskAsDone = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const { tid } = req.params;
      res
        .status(200)
        .json(await this.taskService.markTaskAsDone(parseInt(tid)));
    }
  );

  public deleteTask = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const { tid } = req.params;
      res.status(200).json(await this.taskService.deleteTask(parseInt(tid)));
    }
  );
}
