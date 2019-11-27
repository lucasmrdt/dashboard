import _ from 'lodash';
import { Router } from 'express';
import Joi from '@hapi/joi';
import httpStatus from 'http-status-codes';

import { assertBody } from 'modules/Error/middlewares';
import { onlyAuthed } from 'modules/Auth/middlewares';
import {
  subscribeToWidget,
  unsubscribeToWidget,
  getWidgets,
  getWidgetData,
  updateWidgetParams
} from './controlers';
import { success } from 'utils/apiUtils';

const widgetRouter = Router();

widgetRouter.get('/', onlyAuthed, async (req, res) => {
  const { user } = req as any;
  const widgets = await getWidgets(user);

  res.status(httpStatus.OK).json(success({ widgets }));
});

widgetRouter.get('/data/:widgetId', onlyAuthed, async (req, res) => {
  const { widgetId } = req.params;
  const widgetData = await getWidgetData(widgetId);

  res.status(httpStatus.OK).json(success(widgetData));
});

widgetRouter.post(
  '/:widgetId',
  assertBody({
    params: Joi.object().required()
  }),
  onlyAuthed,
  async (req, res) => {
    const { widgetId } = req.params;
    const { params } = req.body;
    const widgetParams = await updateWidgetParams(widgetId, params);

    res.status(httpStatus.OK).json(success(widgetParams));
  }
);

widgetRouter.post(
  '/subscribe/:serviceName/:widgetName',
  onlyAuthed,
  async (req, res) => {
    const { user } = req as any;
    const { widgetName, serviceName } = req.params;
    const widget = await subscribeToWidget(user, serviceName, widgetName);

    res.status(httpStatus.OK).json(
      success({
        widget: _.pick(widget, ['_id', 'name', 'description', 'icon', 'params'])
      })
    );
  }
);

widgetRouter.post('/unsubscribe/:widgetId', onlyAuthed, async (req, res) => {
  const { widgetId } = req.params;
  await unsubscribeToWidget(widgetId);

  res.status(httpStatus.OK).json(success(null));
});

export default widgetRouter;
