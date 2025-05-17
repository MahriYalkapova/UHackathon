import express, { Router } from 'express';

import { closedRoutes } from './closedRoutes';

const routes: Router = express.Router();

routes.use(closedRoutes);

export { routes };