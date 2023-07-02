import { Router } from 'express';

import car_routes from './car';
import category_routes from './category';
import championship_routes from './championship';
import laptime_routes from './laptime';
import timeboard_routes from './timeboard';

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({
        api: 'racer-tracker',
        version: 'robusta'
    });
});

routes.use(car_routes);
routes.use(category_routes);
routes.use(championship_routes);
routes.use(laptime_routes);
routes.use(timeboard_routes);

export default routes;
