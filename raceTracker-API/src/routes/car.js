import { Router } from 'express';

import CarController from '../controller/CarController';

const car_routes = new Router();

car_routes.post('/cars', CarController.store);

car_routes.get('/cars', CarController.index);

car_routes.get('/cars/:id', CarController.show);

car_routes.get('/cars/:category_id', CarController.index);

car_routes.get('/track/current', CarController.current_on_track);

export default car_routes;
