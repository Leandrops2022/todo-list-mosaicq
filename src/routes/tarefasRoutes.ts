import { Router } from 'express';
import { TarefaController } from '../controllers/TarefaController';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { Tarefa } from '../models/Tarefa';

const tarefasRouter = Router();

tarefasRouter.get('/', TarefaController.listaTarefas);
tarefasRouter.post(
  '/',
  validateRequestBody(Tarefa),
  TarefaController.criarTarefa
);

export default tarefasRouter;
