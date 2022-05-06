/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
import omit from '../helpers/omit';
import { User, UserModel } from '../models/user';

/** @ts-ignore: 'omit' refers to a value, but is being used as a type here. */
export async function createUser(user: omit<User, ['confirmPassword', 'googleId']>) {
  console.log(user);
  return UserModel.create(user);
}

export async function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}
