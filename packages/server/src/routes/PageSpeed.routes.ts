import { Router } from 'express';

import { PageSpeedController } from '../controllers';

export const pageSpeedRouter = Router();

pageSpeedRouter
  .route('/')
  .post(PageSpeedController.makePageSpeedReport)
  .get(PageSpeedController.getAllPageSpeedReports);
