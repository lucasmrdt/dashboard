import Joi from '@hapi/joi';
import createError from 'http-errors';
import httpStatus from 'http-status-codes';

import { SchemaMap } from '@hapi/joi';
import { RequestHandler } from 'express';

export const assertBody = (schema: SchemaMap): RequestHandler => (req, res, next) => {
  const { body } = req;

  try {
    Joi.assert(body, Joi.object(schema).unknown());
    next();
  } catch {
    next(createError(httpStatus.BAD_REQUEST, 'invalid body request provided'));
  }
};
