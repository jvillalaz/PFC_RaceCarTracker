import { Router } from 'express';

import TimeboardController from '../controller/TimeboardController';

const timeboard_routes = new Router();

timeboard_routes.post('/timeboard', TimeboardController.store);

timeboard_routes.get('/timeboard', TimeboardController.index);

timeboard_routes.get('/timeboard/:id', TimeboardController.show);

timeboard_routes.get('/timeboard/car/:car_id', TimeboardController.show);

timeboard_routes.get('/timeboard/championship/:championship_id', TimeboardController.show);

export default timeboard_routes;
