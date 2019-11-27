import httpStatus from 'http-status-codes';
import createError from 'http-errors';
import bcrypt from 'bcrypt';

import { UserModel } from 'modules/User/model';

export const getUserWithToken = async ({ token }: { token: string }) => {
  try {
    console.log(token);
    const user = await UserModel.findOne({ token }).exec();

    if (!user) {
      throw new Error('user not found');
    }
    return user;
  } catch (e) {
    throw createError(httpStatus.UNAUTHORIZED, {
      public: 'invalid user oauth token',
      internal: `Mongoose: ${e.message}`
    });
  }
};

export const getUserWithCredential = async ({
  email,
  password
}: {
  email: string;
  password: string;
}) => {
  try {
    const user = await UserModel.findOne({ email }).exec();
    if (!user) {
      throw new Error('user not found');
    }

    const token = `${email}:${password}`;
    if (!bcrypt.compareSync(token, user.token)) { // eslint-disable-line
      throw new Error('invalid password');
    }

    return user;
  } catch (e) {
    throw createError(httpStatus.UNAUTHORIZED, {
      public: 'invalid user credential',
      internal: `Mongoose: ${e.message}`
    });
  }
};
