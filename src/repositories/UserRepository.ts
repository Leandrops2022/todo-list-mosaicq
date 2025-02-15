import { AppDataSource } from '../database/dataSource';
import { Usuario } from '../models/Usuario';

export const UsuarioRepository = AppDataSource.getRepository(Usuario);
