import { Request, Response } from 'express';
import chalk from 'chalk';
import { PAGESPEED_BASE_URL, GOOGLE_API_KEY } from '../config/constants';

export const getSinglePageSpeedReport = async (req: Request, res: Response) => {
  try {
    const url = req.body.url ?? '';
    const strategy = req.body.strategy ?? 'mobile';

    console.log(req.body);
    console.log('GOOGLE_API_KEY', GOOGLE_API_KEY);

    const response = await fetch(
      `${PAGESPEED_BASE_URL}?key=${GOOGLE_API_KEY}&url=${url}&strategy=${strategy}`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    chalk.red(error);
    res.status(400).json(error);
  }
};
