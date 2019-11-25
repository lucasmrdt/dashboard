import {Router} from 'express';
import Joi from '@hapi/joi';
import httpStatus from 'http-status-codes';

import {getUserWithCredential, getUserWithToken} from './controlers';
import {assertBody} from 'modules/Error/middlewares';
import {success} from 'utils/apiUtils';

const userRouter = Router();

userRouter.post(
  '/credential',
  assertBody({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  async (req, res) => {
    const {email, password} = req.body;
    const user = await getUserWithCredential({email, password});

    res.status(httpStatus.OK).json(success({jwtToken: user.jwtToken}));
  },
);

userRouter.post(
  '/OAuth',
  assertBody({
    token: Joi.string().required(),
  }),
  async (req, res) => {
    const {token} = req.body;
    const user = await getUserWithToken({token});

    res.status(httpStatus.OK).json(success({jwtToken: user.jwtToken}));
  },
);

export default userRouter;
