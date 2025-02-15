import { plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { Tarefa } from '../models/Tarefa';
import { TarefaRepository } from '../repositories/TarefaRepository';

export class TarefaController {
  static async listaTarefas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tarefas = await TarefaRepository.find();
      res.status(200).json({ data: tarefas });
    } catch (error) {
      next(error);
    }
  }

  static async criarTarefa(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tarefa = plainToInstance(Tarefa, req.body);
      const tarefaCriada = await TarefaRepository.save(tarefa);
      res.status(201).json(tarefaCriada);
    } catch (error) {
      next(error);
    }
  }
}
