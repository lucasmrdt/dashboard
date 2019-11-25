import { Router } from 'express';
import Joi from '@hapi/joi';
import httpStatus from 'http-status-codes';

import { onlyAuthed } from 'modules/Auth/middlewares';
import { getServices } from './controlers';
import { assertBody } from 'modules/Error/middlewares';
import { success } from 'utils/apiUtils';

const serviceRouter = Router();

serviceRouter.get('/', onlyAuthed, async (req, res) => {
  const services = await getServices();

  res.status(httpStatus.OK).json(success({ services }));
});

export default serviceRouter;
