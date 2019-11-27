import { Router } from 'express';
import Joi from '@hapi/joi';
import httpStatus from 'http-status-codes';
import { onlyAuthed } from 'modules/Auth/middlewares';
import { getServices, setTokenToService } from './controlers';
import { assertBody } from 'modules/Error/middlewares';
import { success } from 'utils/apiUtils';

const serviceRouter = Router();

serviceRouter.get('/', onlyAuthed, async (req, res) => {
  const services = await getServices();

  res.status(httpStatus.OK).json(success({ services }));
});

serviceRouter.post(
  '/:serviceName/auth',
  onlyAuthed,
  assertBody({ token: Joi.string().required() }),
  async (req, res) => {
    const { serviceName } = req.params;
    const { token } = req.body;
    await setTokenToService(serviceName, token);

    res.status(httpStatus.OK).json(success(null));
  }
);

export default serviceRouter;
