import dotenv from 'dotenv';
import { resolve } from 'path';

import express, { Express } from 'express';
import chalk from 'chalk';
import cors from 'cors';

import { metricRouter } from './routes';

import { corsOptions } from './config';

dotenv.config({
  path: resolve(__dirname, '.env'),
});

const app: Express = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/v1/metrics', metricRouter);

app.get('/hc', (req, res) => {
  res.send({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(chalk.blue(`✨ Server running on port ${chalk.yellow(PORT)} ✨`));
});
