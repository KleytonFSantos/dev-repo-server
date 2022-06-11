import { Router } from 'express';
import auth from './middlewares/auth'
import HelloController from './Controllers/HelloController';
import UsersController from './Controllers/UsersController';
import SessionsController from './Controllers/SessionsController';
import RepositoriesController from './Controllers/RepositoriesController';

const routes = new Router();

routes.get('/hello', HelloController.index);

routes.post('/sessions', SessionsController.create);

routes.use(auth);

routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);

routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.destroy);

routes.get('/users/:user_id/repositories', 
    RepositoriesController.index);
routes.post('/users/:user_id/repositories',
    RepositoriesController.create);
routes.delete('/users/:user_id/repositories/:id', 
    RepositoriesController.destroy);
    
export default routes;