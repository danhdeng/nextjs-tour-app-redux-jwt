/* eslint-disable semi */
/* eslint-disable comma-dangle */
import { object, string, TypeOf } from 'zod';

export const googleUserSchema = {
  body: object({
    googleId: string({
      required_error: 'googleId is required',
    }),
    email: string({
      required_error: 'email is required',
    }).email('must be a valid email address'),
  }),
};

export type GoogleUserBody = TypeOf<typeof googleUserSchema.body>;
