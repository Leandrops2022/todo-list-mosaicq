import { AppDataSource } from '../database/dataSource';
import { Task } from '../models/Task';

export const TaskRepository = AppDataSource.getRepository(Task);
