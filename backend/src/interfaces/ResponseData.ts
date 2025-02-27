import { InsertResult } from 'typeorm';
import { Task } from '../models/Task';
import { User } from '../models/User';
import { TaskPresentationDto } from '../dtos/TaskPresentationDto';

export interface ResponseData {
  message: string;
  data:
    | boolean
    | Task[]
    | Task
    | User
    | User[]
    | InsertResult
    | TaskPresentationDto
    | TaskPresentationDto[]
    | string
    | number;

  token?: string;
}
