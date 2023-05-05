import { Request, Response } from 'express';
import chalk from 'chalk';
import { PAGESPEED_BASE_URL, GOOGLE_API_KEY } from '../config/constants';

export const getSinglePageSpeedReport = async (req: Request, res: Response) => {
  try {
    const url = req.body.url ?? '';
    const strategy = req.body.strategy ?? 'mobile';

    const response = await fetch(
      `${PAGESPEED_BASE_URL}?key=${GOOGLE_API_KEY}&url=${url}&strategy=${strategy}`
    );
    const data = await response.json();

    if (req.query?.summary === 'true') {
      const CUMULATIVE_LAYOUT_SHIFT_SCORE =
        data?.loadingExperience?.metrics?.CUMULATIVE_LAYOUT_SHIFT_SCORE;

      const EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT =
        data?.loadingExperience?.metrics
          ?.EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT;

      const EXPERIMENTAL_TIME_TO_FIRST_BYTE =
        data?.loadingExperience?.metrics?.EXPERIMENTAL_TIME_TO_FIRST_BYTE;

      const FIRST_CONTENTFUL_PAINT_MS =
        data?.loadingExperience?.metrics?.FIRST_CONTENTFUL_PAINT_MS;

      const FIRST_INPUT_DELAY_MS =
        data?.loadingExperience?.metrics?.FIRST_INPUT_DELAY_MS;

      const LARGEST_CONTENTFUL_PAINT_MS =
        data?.loadingExperience?.metrics?.LARGEST_CONTENTFUL_PAINT_MS;

      res.status(200).json({
        CUMULATIVE_LAYOUT_SHIFT_SCORE,
        EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT,
        EXPERIMENTAL_TIME_TO_FIRST_BYTE,
        FIRST_CONTENTFUL_PAINT_MS,
        FIRST_INPUT_DELAY_MS,
        LARGEST_CONTENTFUL_PAINT_MS,
      });

      return;
    }

    res.status(200).json(data);
  } catch (error) {
    chalk.red(error);
    res.status(400).json(error);
  }
};
