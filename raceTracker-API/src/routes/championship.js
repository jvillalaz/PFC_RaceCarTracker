import { Router } from 'express';

import ChampionshipController from '../controller/ChampionshipController';

const championship_routes = new Router();

championship_routes.post('/championship', ChampionshipController.store);

championship_routes.get('/championship', ChampionshipController.index);

championship_routes.get('/championship/:id', ChampionshipController.show);

export default championship_routes;
