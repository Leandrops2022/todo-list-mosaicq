import { AppDataSource } from '../database/dataSource';
import { Tarefa } from '../models/Tarefa';

export const TarefaRepository = AppDataSource.getRepository(Tarefa);
