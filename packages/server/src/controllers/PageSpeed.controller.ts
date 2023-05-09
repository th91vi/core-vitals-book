import { Request, Response } from 'express';
import chalk from 'chalk';
import { PAGESPEED_BASE_URL, GOOGLE_API_KEY } from '../config/constants';

export const getPageSpeedReport = async (req: Request, res: Response) => {
  try {
    const data = [];

    if (!Array.isArray(req?.body)) {
      res
        .status(400)
        .json({ errors: [{ message: 'request body must be an array' }] });
      return;
    }

    for await (const reportOptions of req?.body) {
      try {
        if (!reportOptions.url) {
          res.status(400).json({
            errors: [{ message: '"url" property must not be empty' }],
          });
          return;
        }
        if (!/^(https?:\/\/)/.test(reportOptions.url)) {
          res.status(400).json({
            errors: [
              {
                message: '"url" property must start with http:// or https://',
                invalidUrl: reportOptions.url,
              },
            ],
          });
          return;
        }

        const url = reportOptions.url;
        const strategy = reportOptions.strategy ?? 'mobile';

        const response = await fetch(
          `${PAGESPEED_BASE_URL}?key=${GOOGLE_API_KEY}&url=${url}&strategy=${strategy}`
        );
        const result = await response.json();

        if (result.error) {
          console.log(chalk.red(JSON.stringify(result.error.errors, null, 2)));
          data.push({ errors: result.error.errors });

          continue;
        }

        if (reportOptions?.summary === 'true') {
          data.push({
            summary: {
              url,
              strategy,
              cumulativeLayoutShiftScore:
                result?.loadingExperience?.metrics
                  ?.CUMULATIVE_LAYOUT_SHIFT_SCORE,
              experimentalInteractionToNextPaint:
                result?.loadingExperience?.metrics
                  ?.EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT,
              experimentalTimeToFirstByte:
                result?.loadingExperience?.metrics
                  ?.EXPERIMENTAL_TIME_TO_FIRST_BYTE,
              firstContentfulPaintMs:
                result?.loadingExperience?.metrics?.FIRST_CONTENTFUL_PAINT_MS,
              firstInputDelayMs:
                result?.loadingExperience?.metrics?.FIRST_INPUT_DELAY_MS,
              largestContentfulPaintMs:
                result?.loadingExperience?.metrics?.LARGEST_CONTENTFUL_PAINT_MS,
            },
          });

          continue;
        }

        data.push(result);
      } catch (error) {
        console.log(chalk.red(error));
        break;
      }
    }

    res.status(200).json(data);
  } catch (error) {
    console.log(chalk.red(error));
    res.status(400).json(error);
  }
};
