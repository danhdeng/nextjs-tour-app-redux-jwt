/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
import mongoose from 'mongoose';

import { logger } from './logger';

const MONGOOSE_DB_URL =
  process.env.MONGOOSE_DB_URL ||
  'mongodb+srv://tour_app_dev:TOIcyiYOWE1XjIw2@cluster0.nu9xs.mongodb.net/tour_db?retryWrites=true&w=majority';

export async function connectToDatbase() {
  try {
    await mongoose.connect(MONGOOSE_DB_URL);
    logger.info(`connected to mongoose db : ${MONGOOSE_DB_URL}`);
  } catch (e: any) {
    logger.error('Failed to connect to database. please check the error');
  }
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close();
  logger.info('Disconnect from database');
}
