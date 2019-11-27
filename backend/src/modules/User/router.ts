import { Router } from 'express';
import Joi from '@hapi/joi';
import httpStatus from 'http-status-codes';

import { onlyAuthed } from 'modules/Auth/middlewares';
import { createUserWithCredential, createUserWithToken } from './controlers';
import { assertBody } from 'modules/Error/middlewares';
import { success } from 'utils/apiUtils';

import { UserRequest } from './types';

const userRouter = Router();

userRouter.post(
  '/credential',
  assertBody({
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required()
  }),
  async (req, res) => {
    const { email, name, password } = req.body;
    const user = await createUserWithCredential({ name, email, password });

    res.status(httpStatus.OK).json(success({ jwtToken: user.jwtToken }));
  }
);

userRouter.post(
  '/OAuth',
  assertBody({
    email: Joi.string().required(),
    name: Joi.string().required(),
    token: Joi.string().required()
  }),
  async (req, res) => {
    const { email, name, token } = req.body;
    const user = await createUserWithToken({ name, email, token });

    res.status(httpStatus.OK).json(success({ jwtToken: user.jwtToken }));
  }
);

userRouter.get('/me', onlyAuthed, (req, res) => {
  const { user } = req as UserRequest;

  res
    .status(httpStatus.OK)
    .json(success({ name: user.name, email: user.email }));
});

export default userRouter;
