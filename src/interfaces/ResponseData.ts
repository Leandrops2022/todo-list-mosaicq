import { InsertResult } from 'typeorm';
import { Task } from '../models/Task';
import { User } from '../models/User';

export interface ResponseData {
  message: string;
  data: boolean | Task[] | Task | User | User[] | InsertResult;
  token?: string;
}
