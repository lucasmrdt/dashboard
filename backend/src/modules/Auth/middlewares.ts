import createError from 'http-errors';
import httpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import config from 'config';
import { UserModel } from 'modules/User/model';

import { RequestHandler } from 'express';

export const onlyAuthed: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(createError(httpStatus.FORBIDDEN, 'need authorization header'));
  }

  let user;
  try {
    user = await jwt.verify(token, config.jwt.publicKey, {
      algorithms: ['RS256']
    });
  } catch {
    return next(createError(httpStatus.FORBIDDEN, 'invalid jwt token'));
  }

  const modelUser = await UserModel.findOne({
    token: (user as any).token
  }).exec();
  if (!UserModel) {
    return next(createError(httpStatus.FORBIDDEN, 'unfound user'));
  }

  (req as any).user = modelUser;
  next();
};
