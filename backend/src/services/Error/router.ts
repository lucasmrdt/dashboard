import { Router } from 'express';
import config from 'config';
import httpStatus from 'http-status-codes';
import { fail } from 'utils/apiUtils';

import { ErrorRequestHandler } from 'express';
import { HttpError } from 'http-errors';

const errorRouter = Router();

const errorHandler: ErrorRequestHandler = async (
  e: HttpError,
  req,
  res,
  next // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  if (e instanceof HttpError) {
    const status = e.status || httpStatus.BAD_REQUEST;
    const internalMsg = e.internal || e.message;
    const publicMsg = e.public || e.message;

    res.status(status).json(fail(publicMsg));
    console.log(`[internal] Got error '${internalMsg}' (${status})`);
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(fail('internal error 😢'));
    console.error(`[internal error] @${req.originalUrl} => ${e.message}.`);
  }

  if (config.isDev) {
    throw e;
  }
};

errorRouter.use(errorHandler);

export default errorHandler;
