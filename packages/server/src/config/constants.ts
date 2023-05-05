import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({
  path: resolve(__dirname, '../.env'),
});

export const PAGESPEED_BASE_URL =
  'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
