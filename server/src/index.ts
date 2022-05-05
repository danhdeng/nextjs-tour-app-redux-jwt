/* eslint-disable semi */

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectToDatbase } from './utils/database';
import { logger } from './utils/logger';

const app = express();

app.use(morgan('dev'));
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

require('dotenv').config();

const PORT = process.env.PORT || 4400;

app.listen(PORT, async () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
  await connectToDatbase();
  logger.info(`Server is running at http://localhost:${PORT}`);
});
