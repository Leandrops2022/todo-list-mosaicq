import { Router } from 'express';
import { getGreeting } from '../controllers/greetingController';

const greetingRoutes = Router();

greetingRoutes.get('/', getGreeting);

export default greetingRoutes;
