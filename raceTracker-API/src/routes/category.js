import { Router } from 'express';

import CategoryController from '../controller/CategoryController';

const category_routes = new Router();

category_routes.post('/category', CategoryController.store);

category_routes.get('/category', CategoryController.index);

category_routes.get('/category/:id', CategoryController.show);

export default category_routes;
