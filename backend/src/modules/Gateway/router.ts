import { Router } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import httpStatus from 'http-status-codes';
import createError from 'http-errors';
import { getServerInformation } from 'modules/Gateway/controlers';

const getMiddlewareRouter = () => {
  const middlewareRouter = Router();

  // Secure Header
  middlewareRouter.use(helmet());
  // Parse application/json data
  middlewareRouter.use(bodyParser.json());
  // Parse application/x-www-form-urlencoded data
  middlewareRouter.use(bodyParser.urlencoded({ extended: true }));
  // Compresse response bodies
  middlewareRouter.use(compression());
  // Allow cors
  middlewareRouter.use(cors());

  return middlewareRouter;
};

const getApiRouter = () => {
  const apiRouter = Router();

  apiRouter.use('/auth', require('modules/Auth').default);
  apiRouter.use('/user', require('modules/User').default);
  apiRouter.use('/service', require('modules/Service').default);
  apiRouter.use('/widget', require('modules/Widget').default);

  apiRouter.get(/\/about(\.json)?/, (req, res) => {
    const serverInformation = getServerInformation(req.ip);

    res.status(httpStatus.OK).json(serverInformation);
  });

  return apiRouter;
};

const gatewayRouter = Router();

gatewayRouter.use(getMiddlewareRouter());
gatewayRouter.use(getApiRouter());
gatewayRouter.use((req, res, next) =>
  next(createError(httpStatus.NOT_FOUND, 'unfound service'))
);

export default gatewayRouter;
