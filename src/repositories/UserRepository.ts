import { AppDataSource } from '../database/dataSource';
import { User } from '../models/User';

export const UserRepository = AppDataSource.getRepository(User);
