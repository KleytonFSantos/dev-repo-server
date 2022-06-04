import { Router } from 'express';
import HelloController from './Controllers/HelloController';

const routes = new Router();

routes.get('/hello', HelloController.index);

export default routes;