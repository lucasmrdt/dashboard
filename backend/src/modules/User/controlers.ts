import jwt from 'jsonwebtoken';
import httpStatus from 'http-status-codes';
import createError from 'http-errors';
import bcrypt from 'bcrypt';

import config from 'config';
import { UserModel } from './model';

export const createUserWithToken = async ({
  email,
  name,
  token
}: {
  email: string;
  name: string;
  token: string;
}) => {
  const jwtToken = jwt.sign({ name, email, token }, config.jwt.privateKey, {
    algorithm: 'RS256'
  });

  try {
    const user = await UserModel.create({
      name,
      email,
      token,
      jwtToken
    });
    return user.toJSON();
  } catch (e) {
    throw createError(httpStatus.FORBIDDEN, {
      public: 'account already exists or invalid',
      internal: `Mongoose: ${e.message}`
    });
  }
};

export const createUserWithCredential = async ({
  email,
  name,
  password
}: {
  email: string;
  name: string;
  password: string;
}) => {
  const token = bcrypt.hashSync(`${email}:${password}`, 10); // eslint-disable-line

  return createUserWithToken({ email, name, token });
};
