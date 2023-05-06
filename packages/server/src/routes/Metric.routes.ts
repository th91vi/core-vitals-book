import { Router } from 'express';

import { MetricController } from '../controllers';

export const metricRouter = Router();

metricRouter.route('/').post(MetricController.getSinglePageSpeedReport);
