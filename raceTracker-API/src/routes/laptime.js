import { Router } from 'express';

import LaptimeController from '../controller/LaptimeController';

const laptime_routes = new Router();

laptime_routes.post('/laptime', LaptimeController.store);

laptime_routes.get('/laptime', LaptimeController.index);

laptime_routes.get('/laptime/:id', LaptimeController.show);

laptime_routes.put('/laptime/registerLap', LaptimeController.update);

export default laptime_routes;
