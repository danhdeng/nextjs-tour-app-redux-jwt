/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
import { Request, Response } from 'express';
import { RegisterUserBody } from '../schemas/user';
import { createUser } from '../services/user';
import { StatusCodes } from 'http-status-codes';

export async function registerUserHandler(req: Request<{}, {}, RegisterUserBody>, res: Response) {
  const { username, email, password } = req.body;
  try {
    await createUser({ username, email, password });
    return res.status(StatusCodes.CREATED).send('user created successfully');
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send('User already exists');
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
